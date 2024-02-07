import React, {useState} from 'react';
import Sidebar from '../Messaging/Sidebar';
import Conversation from '../Messaging/Conversation';
import styled from 'styled-components';
import {ConversationContext } from "../Messaging/ConversationContext";
import { IConversation } from '../Messaging/Conversation';

const MessagesContainer = styled.div`
    display: flex;
`;

const Messages = () => {
    const [selectedConversation, setSelectedConversation] = useState<IConversation | null>(null);

    return (
        <ConversationContext.Provider value={{selectedConversation, setSelectedConversation}}>
            <MessagesContainer>
                <Sidebar isconversationselected={selectedConversation !== null}/>
                <Conversation />
            </MessagesContainer>
        </ConversationContext.Provider>
    );
}

export default Messages;


//todo page de messagerie
//todo gestion de la logique d'affichage des conversation en utilisant les fichiers du dossier "Messaging"