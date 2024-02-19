import React from 'react';
import { IConversation } from './ConversationPage';
import {Conversation, ConversationWithMessages} from "../../Interfaces/Conversation";

export interface IConversationContext {
  selectedConversation: Conversation | null;
  setSelectedConversation: (conversation: ConversationWithMessages | null) => void;
}

export const ConversationContext = React.createContext<IConversationContext | undefined>(undefined);