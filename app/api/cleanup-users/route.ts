import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/app/generated/prisma';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import AccountDeletionWarning from '@/emails/account-deletion-warning';
import AccountDeletionConfirmation from '@/emails/account-deletion-confirmation';

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.CLEANUP_CRON_SECRET;
    
    if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date();
    const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const oneYearMinusOneWeekAgo = new Date(now.getTime() - (365 - 7) * 24 * 60 * 60 * 1000);

    let warningsSent = 0;
    let accountsDeleted = 0;
    const errors: string[] = [];

    const usersToDelete = await prisma.user.findMany({
      where: {
        lastActive: {
          lt: oneYearAgo
        },
        isAdmin: false
      }
    });

    for (const user of usersToDelete) {
      try {
        await prisma.user.delete({
          where: { id: user.id }
        });

        const deletionEmailHtml = await render(AccountDeletionConfirmation({
          userEmail: user.email,
          deletionDate: now.toLocaleDateString('fr-FR')
        }));

        await resend.emails.send({
          from: 'Account Management <noreply@augustinviard.dev>',
          to: [user.email],
          subject: 'Votre compte a été supprimé - Account Deleted',
          html: deletionEmailHtml
        });

        accountsDeleted++;
        console.log(`Deleted account: ${user.email}`);
      } catch (error) {
        const errorMsg = `Failed to delete account ${user.email}: ${error}`;
        errors.push(errorMsg);
        console.error(errorMsg);
      }
    }

    const usersToWarn = await prisma.user.findMany({
      where: {
        lastActive: {
          lt: oneYearMinusOneWeekAgo,
          gte: oneYearAgo
        },
        isAdmin: false
      }
    });

    for (const user of usersToWarn) {
      try {
        const warningEmailHtml = await render(AccountDeletionWarning({
          userEmail: user.email,
          deletionDate: oneWeekFromNow.toLocaleDateString('fr-FR'),
          loginUrl: process.env.NEXTAUTH_URL || 'https://augustinviard.dev'
        }));

        await resend.emails.send({
          from: 'Account Management <noreply@augustinviard.dev>',
          to: [user.email],
          subject: '⚠️ Votre compte sera supprimé dans 7 jours - Account Deletion Warning',
          html: warningEmailHtml
        });

        warningsSent++;
        console.log(`Sent warning to: ${user.email}`);
      } catch (error) {
        const errorMsg = `Failed to send warning to ${user.email}: ${error}`;
        errors.push(errorMsg);
        console.error(errorMsg);
      }
    }

    const response = {
      success: true,
      summary: {
        warningsSent,
        accountsDeleted,
        errors: errors.length > 0 ? errors : undefined
      },
      timestamp: now.toISOString()
    };

    console.log('User cleanup completed:', response);
    return NextResponse.json(response);

  } catch (error) {
    console.error('User cleanup failed:', error);
    return NextResponse.json(
      { 
        error: 'User cleanup failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const expectedToken = process.env.CLEANUP_CRON_SECRET;
  
  if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const now = new Date();
    const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    const oneYearMinusOneWeekAgo = new Date(now.getTime() - (365 - 7) * 24 * 60 * 60 * 1000);

    const usersToDelete = await prisma.user.count({
      where: {
        lastActive: { lt: oneYearAgo },
        isAdmin: false
      }
    });

    const usersToWarn = await prisma.user.count({
      where: {
        lastActive: {
          lt: oneYearMinusOneWeekAgo,
          gte: oneYearAgo
        },
        isAdmin: false
      }
    });

    return NextResponse.json({
      preview: true,
      usersToWarn,
      usersToDelete,
      timestamp: now.toISOString()
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get cleanup preview' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}