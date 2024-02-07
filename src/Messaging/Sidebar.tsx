import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import '../App.css';
import { IConversation } from './Conversation';
import {ConversationContext} from "./ConversationContext";


interface SidebarProps {
    isconversationselected: boolean;
}

const SidebarDiv = styled.div<{ isconversationselected: boolean }>`
    width: ${props => (props.isconversationselected ? '200px' : '300px')};
    height: calc(100vh - 100px);
    overflow-y: auto;
    padding: 20px;
    margin-top: 60px;

    @media (min-width: 768px) {
        width: ${props => (props.isconversationselected ? '200px' : '300px')};
    }

    @media (max-width: 767px) {
        width: 100%;
    }
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

const RecipientDiv = styled.div<{ isSelected: boolean }>`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border: ${props => (props.isSelected ? '2px solid red' : 'none')};
`;

let dummyConversations: IConversation[] = [
    {
        id: '1',
        recipient: {
            name: 'John Doe',
            photoUrl: 'https://w7.pngwing.com/pngs/304/275/png-transparent-user-profile-computer-icons-profile-miscellaneous-logo-monochrome-thumbnail.png',
        },
        messages: [
            {
                sender: 'John Doe',
                content: 'Bonjour, comment ça va ?',
                isFromCurrentUser: false,
            },
            {
                sender: 'Guillaumas',
                content: 'Ça va bien, merci. Et vous ?',
                isFromCurrentUser: true,
            },
        ],
    },
    {
        id: '2',
        recipient: {
            name: 'Jane Doe',
            photoUrl: 'https://w7.pngwing.com/pngs/304/275/png-transparent-user-profile-computer-icons-profile-miscellaneous-logo-monochrome-thumbnail.png',
        },
        messages: [
            {
                sender: 'Jane Doe',
                content: 'Salut, as-tu terminé le projet ?',
                isFromCurrentUser: false,
            },
            {
                sender: 'Guillaumas',
                content: 'Oui, je viens de le terminer.',
                isFromCurrentUser: true,
            },
        ],
    },
    {
        id: '3',
        recipient: {
            name: 'Bob Smith',
            photoUrl: 'https://w7.pngwing.com/pngs/304/275/png-transparent-user-profile-computer-icons-profile-miscellaneous-logo-monochrome-thumbnail.png',
        },
        messages: [
            {
                sender: 'Bob Smith',
                content: 'Hey, prêt pour la réunion de demain ?',
                isFromCurrentUser: false,
            },
            {
                sender: 'Guillaumas',
                content: 'Oui, tout est prêt.',
                isFromCurrentUser: true,
            },
        ],
    },
];
const Sidebar: React.FC<SidebarProps> = ({isconversationselected}) => {
    const [selectedConversation, setSelectedConversation] = useState<IConversation | null>(null);
    const context = useContext(ConversationContext);

    const handleSelectConversation = (conversation: IConversation) => {
        setSelectedConversation(conversation);
        if (context) {
            context.setSelectedConversation(conversation);
        }
    };

    const handleDeleteConversation = (id: string) => {
        const updatedConversations = dummyConversations.filter(conversation => conversation.id !== id);
        dummyConversations = updatedConversations;
    };

    return (
        <SidebarDiv isconversationselected={isconversationselected}>
            {dummyConversations.length > 0 ? (
                dummyConversations.map((conversation: IConversation) => (
                    <RecipientDiv
                        key={conversation.id}
                        onClick={() => handleSelectConversation(conversation)}
                        isSelected={selectedConversation?.id === conversation.id}
                    >
                        <RecipientPhoto src={conversation.recipient.photoUrl} alt={conversation.recipient.name}/>
                        <RecipientName>{conversation.recipient.name}</RecipientName>
                        <button onClick={(e) => {e.stopPropagation(); handleDeleteConversation(conversation.id);}}>Supprimer</button>
                    </RecipientDiv>
                ))
            ) : (
                <p>Il n'y a pas de conversations</p>
            )}
        </SidebarDiv>
    );
}

export default Sidebar;

//todo Fonctionnalités de base du composant Sidebar
//todo 1. Afficher la liste des conversations
//todo 3. Supprimer une conversatio
//todo 4. Rechercher une conversatin
//todo 5. Filtrer les conversationspar type de message
//todo 6. Filtrer les conversations par date