import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import '../../Styles/App.css';
import { IConversation } from './ConversationPage';
import {ConversationContext} from "./ConversationContext";
import { USERS, CONVERSATIONS } from '../../routes';
import { AuthContext } from '../../Contexts/AuthContext';
import { User } from '../../Interfaces/User';
import { Plant } from '../../Interfaces/Plant';
import {ConversationService} from "../../Services/ConversationService";
import {Conversation} from "../../Interfaces/Conversation";

interface SidebarProps {
    isconversationselected: boolean;
}

const SidebarDiv = styled.div<{ isconversationselected: boolean }>`
    height: calc(100vh - 100px);
    overflow-y: auto;
    padding: 20px;
    margin-top: 60px;

    @media (min-width: 768px) {
        width: ${props => (props.isconversationselected ? '300px' : '15%')};
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
    border: ${props => (props.isSelected ? '2px solid red' : '1px solid #ddd')};
    gap: 10px;
`;

const Sidebar: React.FC<SidebarProps> = ({isconversationselected}) => {
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [showBotanistButton, setShowBotanistButton] = useState(false);
    const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
    const context = useContext(ConversationContext);
    const authContext = useContext(AuthContext);

    const BOTANIST_ROLE_ID = 2;
    const BOTANIST_ID = 3;

    useEffect(() => {
        if (authContext && authContext.user) {
            const user: User = authContext.user;

            ConversationService.fetchConversationsByUserId(user.id.toString())
                .then((conversations) => {
                    setConversations(conversations);
                    console.log('conversations:', conversations);
                })
                .catch((error) => console.error(error));
        }
    }, [authContext]);

    const handleSelectConversation = (conversation: Conversation) => {
        setSelectedConversation(conversation);
        if (context) {
            // context.setSelectedConversation(conversation);
        }
    };

    const handleDeleteConversation = (id: number) => {
        const updatedConversations = conversations.filter(conversation => conversation.id !== id);
        setConversations(updatedConversations);
    };

    const handleContactBotanist = (plant: Plant) => {
        if (authContext && authContext.user) {
            const user: User = authContext.user;

            const newConversation = {
                id: 0,
                user1_id: user.id,
                user2_id: BOTANIST_ID,
                messages: [{
                    sender: user.username,
                    content: `Plant Information: ${JSON.stringify(plant)}`,
                    isFromCurrentUser: true,
                }],
            };

            fetch(CONVERSATIONS.URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newConversation),
            });
        }
    };

    return (
        <SidebarDiv isconversationselected={isconversationselected}>
            {showBotanistButton && selectedPlant && (
                <button onClick={() => handleContactBotanist(selectedPlant)}>Contact a Botanist</button>
            )}
            {conversations.length > 0 ? (
                conversations.map((conversation: Conversation) => (
                    <RecipientDiv
                        key={conversation.id}
                        onClick={() => handleSelectConversation(conversation)}
                        isSelected={selectedConversation?.id === conversation.id}
                    >
                        {/*<RecipientPhoto src={conversation.recipient.photoUrl} alt={conversation.recipient.name}/>*/}
                        {/*<RecipientName>{conversation.recipient.name}</RecipientName>*/}
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
