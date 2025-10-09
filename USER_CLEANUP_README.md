# User Account Cleanup System

This system automatically manages user accounts based on inactivity periods.

## How it works

1. **Daily Check**: Every day at 2 AM UTC, the system checks all user accounts
2. **Warning Email**: Users inactive for 358 days (1 week before 1 year) receive a warning email
3. **Account Deletion**: Users inactive for 365+ days have their accounts automatically deleted
4. **Admin Protection**: Admin accounts are never deleted automatically

## Timeline

```
Day 358: Warning email sent ("Your account will be deleted in 7 days")
Day 365: Account deleted + confirmation email sent
```

If a user logs in anytime after receiving the warning email, their `lastActive` field is updated and they're safe.

## Files Created

### API Endpoints
- `app/api/cleanup-users/route.ts` - Main cleanup logic
  - `GET /api/cleanup-users` - Preview what would happen (requires auth)
  - `POST /api/cleanup-users` - Execute cleanup (requires auth)

### Email Templates
- `emails/account-deletion-warning.tsx` - Warning email (7 days before deletion)
- `emails/account-deletion-confirmation.tsx` - Confirmation email (after deletion)

### Configuration
- `vercel.json` - Cron job configuration (daily at 2 AM UTC)
- `.env.local.example` - Environment variables needed

### Testing
- `scripts/test-cleanup.js` - Manual testing script

## Environment Variables Required

```bash
# Secret token for cron job security
CLEANUP_CRON_SECRET=your-secret-token-here

# Email service (you should already have this)
RESEND_API_KEY=your-resend-api-key

# App URL (you should already have this)
NEXTAUTH_URL=https://yoursite.com
```

## Security

The cleanup API is protected by a secret token (`CLEANUP_CRON_SECRET`). Only requests with the correct `Authorization: Bearer <token>` header will be processed.

## Testing

1. **Preview Mode**: See what would happen without making changes
   ```bash
   # Set your environment variables first
   node scripts/test-cleanup.js
   ```

2. **Execute Mode**: Actually run the cleanup
   ```bash
   node scripts/test-cleanup.js --execute
   ```

## Manual Execution

You can also trigger cleanup manually by making authenticated requests to:
- `GET /api/cleanup-users` - Preview
- `POST /api/cleanup-users` - Execute

## Monitoring

The API returns detailed logs including:
- Number of warning emails sent
- Number of accounts deleted  
- Any errors that occurred
- Timestamp of execution

Check your deployment logs to monitor the daily cleanup runs.

## Database Changes

The system uses the existing `User.lastActive` field. No additional database fields are required since we don't track warning email timestamps (users are deleted after 1 year regardless).