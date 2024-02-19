export interface Message {
    id: number; // Unique identifier for the message
    conversationId: number; // Identifier of the conversation this message belongs to
    senderId: number; // Identifier of the user who sent the message
    content: string; // The actual content of the message
    createdAt: string; // Timestamp when the message was created
    destination: string; // The destination of the message (e.g. /user/queue/private)
}

// TODO: Add the following properties to the Message interface:
// Read Status

