// 07.07. Chat Server
//
// Explain how you would design a chat server. In particular, provide details
// about the various backend components, classes, and data structures. How
// would you design the set of problems for server-to-client and
// client-to-server communication?
//
// Approach:
//   - Message holds the sender id, content, and timestamp.
//   - Conversation represents a chat thread between two or more users,
//     containing an ordered list of Messages.
//   - User has an id, name, contacts list, and active conversations. Users
//     can add/remove contacts and send messages to conversations.
//   - ChatServer manages all users and conversations. It provides methods
//     to register users, create conversations, send messages, and retrieve
//     conversation history.
//
// Example:
//   const server = new ChatServer();
//   server.addUser(new User(1, 'Alice'));
//   server.addUser(new User(2, 'Bob'));
//   const conv = server.createConversation([1, 2]);
//   server.sendMessage(conv.id, 1, 'Hello Bob!');
//
// Constraints:
//   - Users are identified by a unique numeric id.
//   - A conversation can have two or more participants.
//   - Messages are stored in chronological order within a conversation.
//   - Only participants of a conversation can send messages to it.

export class Message {
  readonly senderId: number;
  readonly content: string;
  readonly timestamp: Date;

  constructor(senderId: number, content: string, timestamp?: Date) {
    this.senderId = senderId;
    this.content = content;
    this.timestamp = timestamp ?? new Date();
  }
}

export class Conversation {
  readonly id: number;
  private participants: Set<number>;
  private messages: Message[] = [];

  constructor(id: number, participantIds: number[]) {
    this.id = id;
    this.participants = new Set(participantIds);
  }

  addMessage(message: Message): boolean {
    if (!this.participants.has(message.senderId)) return false;
    this.messages.push(message);
    return true;
  }

  getMessages(): Message[] {
    return [...this.messages];
  }

  getParticipants(): number[] {
    return [...this.participants];
  }

  hasParticipant(userId: number): boolean {
    return this.participants.has(userId);
  }

  addParticipant(userId: number): void {
    this.participants.add(userId);
  }

  removeParticipant(userId: number): boolean {
    return this.participants.delete(userId);
  }
}

export class User {
  readonly id: number;
  readonly name: string;
  private contacts: Set<number> = new Set();
  private conversationIds: Set<number> = new Set();

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  addContact(userId: number): void {
    this.contacts.add(userId);
  }

  removeContact(userId: number): boolean {
    return this.contacts.delete(userId);
  }

  getContacts(): number[] {
    return [...this.contacts];
  }

  hasContact(userId: number): boolean {
    return this.contacts.has(userId);
  }

  addConversation(conversationId: number): void {
    this.conversationIds.add(conversationId);
  }

  getConversationIds(): number[] {
    return [...this.conversationIds];
  }
}

export class ChatServer {
  private users: Map<number, User> = new Map();
  private conversations: Map<number, Conversation> = new Map();
  private nextConversationId: number = 1;

  addUser(user: User): void {
    this.users.set(user.id, user);
  }

  removeUser(userId: number): boolean {
    return this.users.delete(userId);
  }

  getUser(userId: number): User | undefined {
    return this.users.get(userId);
  }

  createConversation(participantIds: number[]): Conversation | undefined {
    // Verify all participants exist
    for (const id of participantIds) {
      if (!this.users.has(id)) return undefined;
    }

    const conversation = new Conversation(this.nextConversationId++, participantIds);
    this.conversations.set(conversation.id, conversation);

    // Register the conversation with each participant
    for (const id of participantIds) {
      this.users.get(id)!.addConversation(conversation.id);
    }

    return conversation;
  }

  getConversation(conversationId: number): Conversation | undefined {
    return this.conversations.get(conversationId);
  }

  sendMessage(conversationId: number, senderId: number, content: string): Message | undefined {
    const conversation = this.conversations.get(conversationId);
    if (!conversation) return undefined;
    if (!conversation.hasParticipant(senderId)) return undefined;

    const message = new Message(senderId, content);
    conversation.addMessage(message);
    return message;
  }

  getConversationHistory(conversationId: number): Message[] {
    const conversation = this.conversations.get(conversationId);
    if (!conversation) return [];
    return conversation.getMessages();
  }

  getUserConversations(userId: number): Conversation[] {
    const user = this.users.get(userId);
    if (!user) return [];
    return user
      .getConversationIds()
      .map((id) => this.conversations.get(id)!)
      .filter(Boolean);
  }
}
