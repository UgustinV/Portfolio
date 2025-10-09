import React from 'react';

interface AccountDeletionConfirmationProps {
  userEmail: string;
  deletionDate: string;
}

export default function AccountDeletionConfirmation({ 
  userEmail, 
  deletionDate 
}: AccountDeletionConfirmationProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Compte supprimé</title>
      </head>
      <body style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <h1 style={{ color: '#e74c3c', borderBottom: '2px solid #e74c3c', paddingBottom: '10px' }}>
            Compte supprimé
          </h1>
          
          <p>Bonjour,</p>
          
          <p>
            Votre compte ({userEmail}) a été automatiquement supprimé le {deletionDate} en raison de
            l'inactivité prolongée (plus d'un an).
          </p>
          
          <div style={{ 
            backgroundColor: '#f8d7da', 
            border: '1px solid #f5c6cb', 
            borderRadius: '5px', 
            padding: '15px', 
            margin: '20px 0' 
          }}>
            <p style={{ margin: '0', fontWeight: 'bold' }}>
              ⚠️ Toutes vos données de compte ont été définitivement supprimées et ne peuvent pas être récupérées.
            </p>
          </div>
          
          <p>
            Cela inclut :
          </p>
          <ul>
            <li>Votre adresse e-mail</li>
          </ul>
          
          <p>
            Si vous souhaitez vous connecter à nouveau à ce site à l'avenir, vous devrez créer un nouveau compte.
          </p>
          
          <p>
            Merci d'avoir utilisé le site.
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