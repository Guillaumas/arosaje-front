import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import '../../Styles/App.css';
import {ConversationContext} from "./ConversationContext";
import {MessageService} from "../../Services/MessageService";
import {Conversation} from "../../Interfaces/Conversation";
export interface IRecipient {
    name: string;
    photoUrl: string;
}

export interface IMessage {
    sender: string;
    content: string;
    isFromCurrentUser: boolean;
}

export interface IConversation {
    id: number;
    recipient: IRecipient;
    messages: IMessage[];
}

interface ConversationProps {
    selectedConversation: IConversation | null;
}

const ConversationDiv = styled.div`
    position: relative;
    padding: 20px;
    overflow-y: auto;
    height: calc(100vh - 100px);
    border-left: 1px solid #ddd;
    background-color: transparent;
    margin-top: 60px;
    width: 100%;
`;

const StyledForm = styled.form`
    position: absolute;
    bottom: 0;
    width: 100%;
`;

const MessageP = styled.p<{ isFromCurrentUser: boolean }>`
    background-color: ${props => props.isFromCurrentUser ? '#48806C' : '#527E19'};
    color: white;
    margin-bottom: 10px;
    line-height: 1.5;
    text-align: ${props => (props.isFromCurrentUser ? 'right' : 'left')};
`;

const Conversation: React.FC = () => {
    const [selectedConversation, setSelectedConversation] = useState<IConversation | null>(null);
    const [newMessage, setNewMessage] = useState<string>('');
    const context = useContext(ConversationContext);

    useEffect(() => {
        // Set up WebSocket connection and message receiving
        MessageService.connect(
            () => console.log('WebSocket connected'),
            (message) => {
                if (selectedConversation && message.conversationId === selectedConversation.id) {
                    // @ts-ignore
                    setSelectedConversation((prevConversation) => {
                        if (prevConversation) {
                            return {
                                ...prevConversation,
                                messages: [...prevConversation.messages, message],
                            };
                        }
                        return prevConversation;
                    });
                }
            }
        );

        return () => {
            MessageService.disconnect();
        };
    }, [selectedConversation]);

    useEffect(() => {
        if (context) {
            setSelectedConversation(context.selectedConversation);
        }
    }, [context]);

    const handleNewMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(event.target.value);
    };

    const handleNewMessageSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (selectedConversation) {
            const message = {
                id: 0,
                senderId: 0,
                content: newMessage,
                isFromCurrentUser: true,
                conversationId: selectedConversation.id,
                createdAt: new Date().toISOString(),
            };

            // Send the message via WebSocket
            MessageService.sendMessage("/app/private-message", message);
            setNewMessage('');
        }
    };

    return (
        <ConversationDiv>
            {selectedConversation && selectedConversation.messages ? (
                selectedConversation.messages.map((message: IMessage, index: number) => (
                    <MessageP key={index} isFromCurrentUser={message.isFromCurrentUser}>
                        <strong>{message.sender}:</strong> {message.content}
                    </MessageP>
                ))
            ) : (
                <p>Aucune conversation sélectionnée</p>
            )}
            <StyledForm onSubmit={handleNewMessageSubmit}>
                <input type="text" value={newMessage} onChange={handleNewMessageChange}/>
                <button type="submit">Envoyer</button>
            </StyledForm>
        </ConversationDiv>
    );
}
export default Conversation;

//todo Fonctionnalités de base du composant conversation
//todo 3. Supprimer un message de la conversation sélectionnée (appuie long sur le message) -- gadget
//todo 4. Modifier un message de la conversation sélectionnée (appuie long sur le message) -- gadget
//todo 5. Supprimer la conversation sélectionnée (menu contextuel en haut a droite de la conversation) -- sidebar
//todo 6. Changer le type de message (texte, image, vidéo, audio, etc.) (a coté du clavier) -- gadget
//todo 7. Ajouter des fonctionnalités de recherche et de filtre pour les messages (menu contextuel en haut a droite de la conversation) -- gadget



