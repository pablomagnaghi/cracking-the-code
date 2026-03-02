import {
  Message,
  Conversation,
  User,
  ChatServer,
} from '../../src/object-oriented-design/07-chat-server';

describe('Chat Server', () => {
  test('Message stores sender, content, and timestamp', () => {
    const now = new Date();
    const msg = new Message(1, 'Hello', now);
    expect(msg.senderId).toBe(1);
    expect(msg.content).toBe('Hello');
    expect(msg.timestamp).toBe(now);
  });

  test('Message creates timestamp automatically if not provided', () => {
    const msg = new Message(1, 'Hi');
    expect(msg.timestamp).toBeInstanceOf(Date);
  });

  test('Conversation manages participants and messages', () => {
    const conv = new Conversation(1, [1, 2]);
    expect(conv.hasParticipant(1)).toBe(true);
    expect(conv.hasParticipant(3)).toBe(false);

    const msg = new Message(1, 'Hello');
    expect(conv.addMessage(msg)).toBe(true);
    expect(conv.getMessages()).toHaveLength(1);

    // Non-participant cannot send
    const badMsg = new Message(99, 'Spam');
    expect(conv.addMessage(badMsg)).toBe(false);
    expect(conv.getMessages()).toHaveLength(1);
  });

  test('User manages contacts', () => {
    const user = new User(1, 'Alice');
    user.addContact(2);
    user.addContact(3);
    expect(user.hasContact(2)).toBe(true);
    expect(user.getContacts()).toEqual(expect.arrayContaining([2, 3]));

    user.removeContact(2);
    expect(user.hasContact(2)).toBe(false);
  });

  test('ChatServer registers users and creates conversations', () => {
    const server = new ChatServer();
    server.addUser(new User(1, 'Alice'));
    server.addUser(new User(2, 'Bob'));

    const conv = server.createConversation([1, 2]);
    expect(conv).toBeDefined();
    expect(conv!.hasParticipant(1)).toBe(true);
    expect(conv!.hasParticipant(2)).toBe(true);
  });

  test('ChatServer rejects conversation with non-existent user', () => {
    const server = new ChatServer();
    server.addUser(new User(1, 'Alice'));
    expect(server.createConversation([1, 999])).toBeUndefined();
  });

  test('ChatServer sends messages and retrieves history', () => {
    const server = new ChatServer();
    server.addUser(new User(1, 'Alice'));
    server.addUser(new User(2, 'Bob'));
    const conv = server.createConversation([1, 2])!;

    const msg1 = server.sendMessage(conv.id, 1, 'Hello Bob');
    const msg2 = server.sendMessage(conv.id, 2, 'Hi Alice');

    expect(msg1).toBeDefined();
    expect(msg2).toBeDefined();

    const history = server.getConversationHistory(conv.id);
    expect(history).toHaveLength(2);
    expect(history[0].content).toBe('Hello Bob');
    expect(history[1].content).toBe('Hi Alice');
  });

  test('ChatServer rejects message from non-participant', () => {
    const server = new ChatServer();
    server.addUser(new User(1, 'Alice'));
    server.addUser(new User(2, 'Bob'));
    server.addUser(new User(3, 'Eve'));
    const conv = server.createConversation([1, 2])!;

    expect(server.sendMessage(conv.id, 3, 'Intruder')).toBeUndefined();
  });

  test('ChatServer getUserConversations returns conversations for a user', () => {
    const server = new ChatServer();
    server.addUser(new User(1, 'Alice'));
    server.addUser(new User(2, 'Bob'));
    server.addUser(new User(3, 'Carol'));

    server.createConversation([1, 2]);
    server.createConversation([1, 3]);

    const convs = server.getUserConversations(1);
    expect(convs).toHaveLength(2);
    expect(server.getUserConversations(2)).toHaveLength(1);
  });

  test('ChatServer handles non-existent conversation gracefully', () => {
    const server = new ChatServer();
    expect(server.sendMessage(999, 1, 'Hello')).toBeUndefined();
    expect(server.getConversationHistory(999)).toEqual([]);
  });
});
