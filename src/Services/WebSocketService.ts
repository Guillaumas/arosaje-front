import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {Message} from '../Interfaces/Message';

class WebSocketService {
    private stompClient: Stomp.Client | null = null;
    isConnected: boolean = false;
    private serverUrl: string = 'http://localhost:8080/ws';
    private reconnectAttempts: number = 0;
    private maxReconnectAttempts: number = 5;

    connect(onConnectedCallback: () => void, onMessageReceivedCallback: (message: Message) => void) {
        const socket = new SockJS(this.serverUrl);
        this.stompClient = Stomp.over(socket);

        this.stompClient.connect({}, () => {
            this.isConnected = true;
            console.log('Connected to WS');
            onConnectedCallback();
            this.reconnectAttempts = 0; // Reset reconnect attempts on successful connection
            if (this.stompClient && this.stompClient.connected) {
                this.stompClient?.subscribe('/user/queue/private', (messageOutput) => {
                    onMessageReceivedCallback(JSON.parse(messageOutput.body));
                });
            }

        }, (error) => {
            console.error('Error connecting to WS:', error);
            this.scheduleReconnect(onConnectedCallback, onMessageReceivedCallback);
        });
    }

    sendMessage(destination: string, message: Message) {
        if (this.isConnected && this.stompClient && this.stompClient.connected) {
            this.stompClient.send(destination, {}, JSON.stringify(message));
        } else {
            console.error('Cannot send message. Not connected to WebSocket.');
            // Optionally queue the message for later or handle reconnection here
        }
    }

    disconnect() {
        if (this.isConnected && this.stompClient) {
            this.stompClient.disconnect(() => {
                this.isConnected = false;
                console.log('Disconnected from WS');
            });
        }
    }

    private scheduleReconnect(onConnectedCallback: () => void, onMessageReceivedCallback: (message: Message) => void) {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            setTimeout(() => {
                console.log(`Attempting to reconnect (${this.reconnectAttempts + 1}/${this.maxReconnectAttempts})...`);
                this.reconnectAttempts++;
                this.connect(onConnectedCallback, onMessageReceivedCallback);
            }, 5000); // Wait 5 seconds before trying to reconnect
        }
    }
}

export default new WebSocketService();
