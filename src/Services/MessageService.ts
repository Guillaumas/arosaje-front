// services/MessageService.ts
import WebSocketService from './WebSocketService';
import { Message } from '../Interfaces/Message';

const webSocketUrl = 'wss://your-websocket-url'; // Adjust this to your WebSocket server URL

export const MessageService = {
    webSocketService: WebSocketService.getInstance(),

    connect() {
        this.webSocketService.connect(webSocketUrl);
    },

    sendMessage(message: Message) {
        this.webSocketService.sendMessage(message);
    },

    onMessageReceived(handler: (message: Message) => void) {
        this.webSocketService.onMessage(handler);
    },

    disconnect() {
        this.webSocketService.disconnect();
    }
};
