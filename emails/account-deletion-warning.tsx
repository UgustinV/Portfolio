import React from 'react';

interface AccountDeletionWarningProps {
  userEmail: string;
  deletionDate: string;
  loginUrl: string;
}

export default function AccountDeletionWarning({ 
  userEmail, 
  deletionDate, 
  loginUrl 
}: AccountDeletionWarningProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Alerte de suppression de compte</title>
      </head>
      <body style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <h1 style={{ color: '#e74c3c', borderBottom: '2px solid #e74c3c', paddingBottom: '10px' }}>
            ⚠️ Alerte de suppression de compte
          </h1>
          <p>Bonjour,</p>
          <p>
            Nous avons remarqué que votre compte ({userEmail}) a été inactif pendant près d'un an.
            Votre compte sera <strong>automatiquement supprimé le {deletionDate}</strong> en raison de l'inactivité prolongée.
          </p>
          
          <div style={{ 
            backgroundColor: '#fff3cd', 
            border: '1px solid #ffeaa7', 
            borderRadius: '5px', 
            padding: '15px', 
            margin: '20px 0' 
          }}>
            <p style={{ margin: '0', fontWeight: 'bold' }}>
              Pour éviter la suppression de votre compte, il vous suffit de vous connecter à votre compte avant le {deletionDate}.
            </p>
          </div>
          
          <div style={{ textAlign: 'center', margin: '30px 0' }}>
            <a 
              href={loginUrl}
              style={{
                backgroundColor: '#3498db',
                color: 'white',
                padding: '12px 24px',
                textDecoration: 'none',
                borderRadius: '5px',
                fontWeight: 'bold',
                display: 'inline-block'
              }}
            >
              Se connecter pour garder mon compte
            </a>
          </div>
          
          <p>
            Si vous ne souhaitez plus utiliser ce compte, aucune action n'est requise et votre compte sera automatiquement supprimé à la date spécifiée. Vous pouvez également supprimer votre compte manuellement à tout moment en vous connectant et en cliquant sur le bouton en bas de page.
          </p>
          
          <hr style={{ margin: '30px 0', borderColor: '#ddd' }} />
          
          <p style={{ fontSize: '12px', color: '#666' }}>
            Ceci est un e-mail automatique, merci de ne pas y répondre.
            <br />
            Si vous avez des questions, veuillez me contacter via le formulaire de contact du site.
          </p>
        </div>
      </body>
    </html>
  );
}