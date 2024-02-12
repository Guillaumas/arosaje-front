import fetchFromAPI from './ApiService';
import { Conversation } from '../Interfaces/Conversation';

export const ConversationService = {
    fetchConversations(): Promise<Conversation[]> {
        return fetchFromAPI('conversations');
    },
    createConversation(conversationData: Conversation): Promise<Conversation> {
        return fetchFromAPI('conversations', 'POST', conversationData);
    },
    updateConversation(conversationData: Conversation): Promise<Conversation> {
        return fetchFromAPI(`conversations/${conversationData.id}`, 'PUT', conversationData);
    },
    deleteConversation(id: number): Promise<void> {
        return fetchFromAPI(`conversations/${id}`, 'DELETE');
    }
};
