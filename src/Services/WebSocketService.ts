import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { Message } from '../Interfaces/Message';

class WebSocketService {
    private stompClient: Stomp.Client | null = null;
    private serverUrl: string = 'http://localhost:8080/ws'; // Adjust this URL to your WebSocket endpoint

    connect(onConnectedCallback: () => void, onMessageReceivedCallback: (message: Message) => void) {
        let socket: WebSocket ;
        socket = new SockJS(this.serverUrl);
        this.stompClient = Stomp.over(socket);

        this.stompClient.connect({}, () => {
            console.log('Connected to WS');
            onConnectedCallback();

            // Subscribe to the private queue; adjust the destination as needed
            this.stompClient?.subscribe('/user/queue/private', (messageOutput) => {
                onMessageReceivedCallback(JSON.parse(messageOutput.body));
            });
        }, (error) => {
            console.error('Error connecting to WS:', error);
        });
    }

    sendMessage(destination: string, message: Message) {
        if (this.stompClient && this.stompClient.connected) {
            this.stompClient.send(destination, {}, JSON.stringify(message));
        } else {
            console.error('Cannot send message. Not connected to WebSocket.');
        }
    }

    disconnect() {
        if (this.stompClient) {
            this.stompClient.disconnect(() => {
                console.log('Disconnected from WS');
            });
        }
    }
}

export default new WebSocketService();
