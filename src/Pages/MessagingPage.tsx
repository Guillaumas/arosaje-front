import React, { useState } from 'react';
import Sidebar from '../Messaging/Sidebar';
import Conversation, { IConversation } from '../Messaging/Conversation';
import styled from 'styled-components';

const MessagesContainer = styled.div`
    display: flex;
`;

const Messages = () => {
    const [selectedConversation, setSelectedConversation] = useState<IConversation | null>(null);

    return (
        <MessagesContainer>
            <Sidebar isconversationselected={selectedConversation !== null} />
            <Conversation selectedConversation={selectedConversation} />
        </MessagesContainer>
    );
}

export default Messages;


//todo page de messagerie
//todo gestion de la logique d'affichage des conversation en utilisant les fichiers du dossier "Messaging"