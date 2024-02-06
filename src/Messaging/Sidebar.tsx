import React from 'react';
import styled from 'styled-components';
import '../App.css';

interface Recipient {
  name: string;
  photoUrl: string;
}

interface Conversation {
  id: string;
  recipient: Recipient;
}

interface SidebarProps {
  isConversationSelected: boolean;
}

const SidebarDiv = styled.div<{ isConversationSelected: boolean }>`
  width: ${props => (props.isConversationSelected ? '200px' : '300px')};
  height: 100vh;
  overflow-y: auto;
  padding: 20px;
  
  @media (min-width: 768px) {
    width: ${props => (props.isConversationSelected ? '200px' : '300px')};
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const RecipientDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const RecipientPhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const RecipientName = styled.h2`
  margin: 0;
`;

const dummyConversations: Conversation[] = [
  {
    id: '1',
    recipient: {
      name: 'John Doe',
      photoUrl: 'https://example.com/john.jpg',
    },
  },
  {
    id: '2',
    recipient: {
      name: 'Jane Doe',
      photoUrl: 'https://example.com/jane.jpg',
    },
  },
  {
    id: '3',
    recipient: {
      name: 'Bob Smith',
      photoUrl: 'https://example.com/bob.jpg',
    },
  },
];
const Sidebar: React.FC<SidebarProps> = ({ isConversationSelected }) => {
  return (
    <SidebarDiv isConversationSelected={isConversationSelected}>
      {dummyConversations.length > 0 ? (
        dummyConversations.map((conversation: Conversation) => (
          <RecipientDiv key={conversation.id}>
            <RecipientPhoto src={conversation.recipient.photoUrl} alt={conversation.recipient.name} />
            <RecipientName>{conversation.recipient.name}</RecipientName>
          </RecipientDiv>
        ))
      ) : (
        <p>Il n'y a pas de conversations</p>
      )}
    </SidebarDiv>
  );
};

export default Sidebar;

//todo Fonctionnalités de base du composant Sidebar
//todo 1. Afficher la liste des conversations
//todo 2. Ajouter une conversation
//todo 3. Supprimer une conversatio
//todo 4. Rechercher une conversatin
//todo 5. Filtrer les conversationspar type de message
//todo 6. Filtrer les conversations par date