import React from 'react';
import { IConversation } from './Conversation';

export interface IConversationContext {
  selectedConversation: IConversation | null;
  setSelectedConversation: (conversation: IConversation | null) => void;
}

export const ConversationContext = React.createContext<IConversationContext | undefined>(undefined);