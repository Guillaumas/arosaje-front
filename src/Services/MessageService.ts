import WebSocketService from './WebSocketService';
import { Message } from '../Interfaces/Message';

let messageQueue: Message[] = [];

export const MessageService = {
    connect(onConnected: () => void, onMessageReceived: (message: Message) => void) {
        WebSocketService.connect(() => {
            onConnected();
            // When the connection is established, send all queued messages
            while (messageQueue.length > 0) {
                const message = messageQueue.shift();
                if (message) {
                    this.sendMessage(message.destination, message);
                }
            }
        }, onMessageReceived);
    },

    sendMessage(destination : string, message : Message) {
        if (WebSocketService.isConnected) {
            WebSocketService.sendMessage(destination, message);
        } else {
            console.error('Attempted to send a message before connection was established. Queuing the message.');
            // Queue the message to be sent when the connection is established
            messageQueue.push(message);
        }
    },

    disconnect() {
        WebSocketService.disconnect();
    }
};