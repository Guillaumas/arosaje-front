import WebSocketService from './WebSocketService';
import { Message } from '../Interfaces/Message';

export const MessageService = {
    connect(onConnected: () => void, onMessageReceived: (message: Message) => void) {
        try {
            WebSocketService.connect(onConnected, onMessageReceived);
        } catch (error) {
            console.error('Error connecting to WebSocket:', error);
        }
    },

    sendMessage(destination: string, message: Message) {
        try {
            WebSocketService.sendMessage(destination, message);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    },

    disconnect() {
        try {
            WebSocketService.disconnect();
        } catch (error) {
            console.error('Error disconnecting from WebSocket:', error);
        }
    }
};