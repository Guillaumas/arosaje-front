import fetchFromAPI from './ApiService';
import {Conversation} from '../Interfaces/Conversation';

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
    fetchConversationById(id: number): Promise<Conversation> {
        return fetchFromAPI(`conversations/${id}`)
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
                console.error('Error fetching conversation:', error);
                return {} as Conversation;
            });
    },
    fetchConversationsByUserId(userId: String): Promise<Conversation[]> {
        console.log("FetchConversationsByUserId", typeof userId)
        return fetchFromAPI(`conversations/findByUserId/` + userId)
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
    createConversation(user1Id: number, user2Id: number): Promise<Conversation> {
        console.log("CreateConversation", user1Id, user2Id)
        const conversationData = {
            user1Id,
            user2Id,
        };
        return fetchFromAPI('conversations', 'POST', conversationData)
            .then(response => {
                console.log("CreateConversation Response:", response);
                if (!response.ok) {
                    throw new Error(`API call failed: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("CreateCOnversation Data", data);
                if (data === null) {
                    throw new Error('No data returned from API');
                }
                return data;
            })
            .catch(error => {
                console.error('Error creating conversation:', error);
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


    getConversationWithMessages(id: number | undefined) {
        return fetchFromAPI(`conversations/${id}/messages`)
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
                console.error('Error fetching conversation:', error);
                return [];
            });
    }
};