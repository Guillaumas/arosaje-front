import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { Message } from '../Interfaces/Message';

class WebSocketService {
    private stompClient: Stomp.Client | null = null;
    private isConnected: boolean = false; // Connection status flag
    private serverUrl: string = 'http://localhost:8080/ws';

    connect(onConnectedCallback: () => void, onMessageReceivedCallback: (message: Message) => void) {
        const socket = new SockJS(this.serverUrl);
        this.stompClient = Stomp.over(socket);

        this.stompClient.connect({}, () => {
            this.isConnected = true; // Set flag to true when connected
            console.log('Connected to WS');
            onConnectedCallback();

            this.stompClient?.subscribe('/user/queue/private', (messageOutput) => {
                onMessageReceivedCallback(JSON.parse(messageOutput.body));
            });
        }, (error) => {
            console.error('Error connecting to WS:', error);
        });
    }

    sendMessage(destination: string, message: Message) {
        if (this.isConnected && this.stompClient && this.stompClient.connected) {
            this.stompClient.send(destination, {}, JSON.stringify(message));
        } else {
            console.error('Cannot send message. Not connected to WebSocket.');
        }
    }

    disconnect() {
        if (this.isConnected && this.stompClient) {
            this.stompClient.disconnect(() => {
                this.isConnected = false; // Reset flag when disconnected
                console.log('Disconnected from WS');
            });
        }
    }
}

export default new WebSocketService();
