import React from 'react';
import styled from 'styled-components';
import '../App.css';

interface Message {
  sender: string;
  content: string;
  isFromCurrentUser: boolean;
}

interface Conversation {
  messages: Message[];
}

interface ConversationProps {
  selectedConversation: Conversation | null;
}

const ConversationDiv = styled.div`
  padding: 20px;
  overflow-y: auto;
  height: calc(100vh - 40px);
  border-left: 1px solid #ddd;
  background-color: transparent;
`;

const MessageP = styled.p<{ isFromCurrentUser: boolean }>`
  margin-bottom: 10px;
  line-height: 1.5;
  text-align: ${props => (props.isFromCurrentUser ? 'right' : 'left')};
`;

const Conversation: React.FC<ConversationProps> = ({ selectedConversation }) => {
  return (
    <ConversationDiv>
      {selectedConversation && selectedConversation.messages ? (
        selectedConversation.messages.map((message: Message, index: number) => (
          <MessageP key={index} isFromCurrentUser={message.isFromCurrentUser}>
            <strong>{message.sender}:</strong> {message.content}
          </MessageP>
        ))
      ) : (
        <p>Aucune conversation sélectionnée</p>
      )}
    </ConversationDiv>
  );
};

export default Conversation;

//todo Fonctionnalités de base du composant conversation
//todo 1. Afficher les messages de la conversation sélectionnée
//todo 2. Ajouter un message à la conversation sélectionnée
//todo 3. Supprimer un message de la conversation sélectionnée (appuie long sur le message)
//todo 4. Modifier un message de la conversation sélectionnée (appuie long sur le message)
//todo 5. Supprimer la conversation sélectionnée (menu contextuel en haut a droite de la conversation)
//todo 6. Changer le type de message (texte, image, vidéo, audio, etc.) (a coté du clavier)
//todo 7. Ajouter des fonctionnalités de recherche et de filtre pour les messages (menu contextuel en haut a droite de la conversation)



