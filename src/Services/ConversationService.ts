import fetchFromAPI from './ApiService';
import { Conversation } from '../Interfaces/Conversation';

export const ConversationService = {
    fetchConversations(): Promise<Conversation[]> {
        return fetchFromAPI('conversations')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`API call failed: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                if (data === null) {
                    throw new Error('No data returned from API');
                }
                return data;
            })
            .catch(error => {
                console.error('Error fetching conversations:', error);
                return [];
            });
    },
    createConversation(conversationData: Conversation): Promise<Conversation> {
        return fetchFromAPI('conversations', 'POST', conversationData)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`API call failed: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                if (data === null) {
                    throw new Error('No data returned from API');
                }
                return data;
            })
            .catch(error => {
                console.error('Error creating conversation:', error);
                return null;
            });
    },
    updateConversation(conversationData: Conversation): Promise<Conversation> {
        return fetchFromAPI(`conversations/${conversationData.id}`, 'PUT', conversationData)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`API call failed: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                if (data === null) {
                    throw new Error('No data returned from API');
                }
                return data;
            })
            .catch(error => {
                console.error('Error updating conversation:', error);
                return null;
            });
    },
    deleteConversation(id: number): Promise<void> {
        return fetchFromAPI(`conversations/${id}`, 'DELETE')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`API call failed: ${response.statusText}`);
                }
            })
            .catch(error => {
                console.error('Error deleting conversation:', error);
            });
    },
};