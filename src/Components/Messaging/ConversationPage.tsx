import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import '../../Styles/App.css';
import {ConversationContext} from "./ConversationContext";
import {MessageService} from "../../Services/MessageService";
import {Conversation, ConversationWithMessages} from "../../Interfaces/Conversation";
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
    selectedConversation: Conversation | null;
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

const ConversationPage: React.FC = () => {
    const [selectedConversation, setSelectedConversation] = useState<ConversationWithMessages | null>(null);
    const [newMessage, setNewMessage] = useState<string>('');
    const context = useContext(ConversationContext);

    useEffect(() => {
        // Set up WebSocket connection and message receiving
        MessageService.connect(
            () => console.log('WebSocket connected'),
            (message) => {
                // Handle received message
                // You need to determine if the incoming message belongs to the current conversation
                // This is a simplified example
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
            // setSelectedConversation(context.selectedConversation);
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
                destination: ""
            };

            // Send the message via WebSocket
            MessageService.sendMessage("/app/private-message", message);
            setNewMessage('');
        }
    };

    return (
        <ConversationDiv>
            {selectedConversation && selectedConversation.messages ? (
                selectedConversation.messages.map((message, index) => (
                    // // <MessageP key={index}>
                    //     {message.content}
                    // </MessageP>
                    <div> message</div>
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
export default ConversationPage;

