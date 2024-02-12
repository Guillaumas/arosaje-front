// MessageService.ts
import WebSocketService from './WebSocketService';
import { Message } from '../Interfaces/Message';

export const MessageService = {
    connect(onConnected: () => void, onMessageReceived: (message: Message) => void) {
        // Directly use WebSocketService's connect method with the provided callbacks
        WebSocketService.connect(onConnected, onMessageReceived);
    },

    sendMessage(destination: string, message: Message) {
        // Use WebSocketService to send a message to the given STOMP destination
        WebSocketService.sendMessage(destination, message);
    },

    disconnect() {
        // Use WebSocketService to disconnect from the WebSocket server
        WebSocketService.disconnect();
    }
};
