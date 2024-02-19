import React, {useState} from 'react';
import Sidebar from '../Messaging/Sidebar';
import ConversationPage from '../Messaging/ConversationPage';
import styled from 'styled-components';
import {ConversationContext } from "../Messaging/ConversationContext";
import { IConversation } from '../Messaging/ConversationPage';
import {Conversation} from "../../Interfaces/Conversation";

const MessagesContainer = styled.div`
    display: flex;
`;

const Messages = () => {
    const [selectedConversation, setSelectedConversation] = useState<Conversation| null>(null);

    let selectedConversationWithMessages: IConversation | null = null;


    return (
        <ConversationContext.Provider value={{selectedConversation, setSelectedConversation, selectedConversationWithMessages}}>
            <MessagesContainer>
                <Sidebar isconversationselected={selectedConversation !== null}/>
                <ConversationPage />
            </MessagesContainer>
        </ConversationContext.Provider>
    );
}

export default Messages;

