import {Message} from "./Message";

export interface Conversation {
    id: number;
    user1Id: number;
    user2Id: number;
}

export interface ConversationWithMessages extends Conversation {
    messages: Message[];
}
