import { Pastebin } from '../../src/system-design/08-pastebin';

describe('Pastebin', () => {
  let pastebin: Pastebin;

  beforeEach(() => {
    pastebin = new Pastebin();
  });

  test('creates a paste and returns it with a unique id', () => {
    const paste = pastebin.create('Hello, world!');
    expect(paste.id).toBeDefined();
    expect(paste.id.length).toBe(8);
    expect(paste.content).toBe('Hello, world!');
    expect(paste.createdAt).toBeInstanceOf(Date);
    expect(paste.expiresAt).toBeNull();
  });

  test('retrieves a paste by id', () => {
    const created = pastebin.create('Test content');
    const retrieved = pastebin.get(created.id);
    expect(retrieved).not.toBeNull();
    expect(retrieved!.content).toBe('Test content');
    expect(retrieved!.id).toBe(created.id);
  });

  test('returns null for nonexistent paste', () => {
    expect(pastebin.get('nonexistent')).toBeNull();
  });

  test('deletes a paste', () => {
    const paste = pastebin.create('To be deleted');
    expect(pastebin.delete(paste.id)).toBe(true);
    expect(pastebin.get(paste.id)).toBeNull();
    expect(pastebin.delete(paste.id)).toBe(false); // Already deleted
  });

  test('generates unique ids for each paste', () => {
    const ids = new Set<string>();
    for (let i = 0; i < 100; i++) {
      const paste = pastebin.create(`Content ${i}`);
      ids.add(paste.id);
    }
    expect(ids.size).toBe(100);
  });

  test('tracks paste count', () => {
    expect(pastebin.getCount()).toBe(0);
    pastebin.create('One');
    pastebin.create('Two');
    pastebin.create('Three');
    expect(pastebin.getCount()).toBe(3);
    pastebin.delete(pastebin.create('Four').id);
    expect(pastebin.getCount()).toBe(3); // 4 created, 1 deleted
  });

  test('supports custom slug length', () => {
    const shortPastebin = new Pastebin(4);
    const paste = shortPastebin.create('Short slug');
    expect(paste.id.length).toBe(4);
  });

  test('expired pastes return null on get', () => {
    // Create a paste with a 1ms TTL
    const paste = pastebin.create('Temporary', 1);
    expect(paste.expiresAt).not.toBeNull();

    // Wait a small amount for expiration
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(pastebin.get(paste.id)).toBeNull();
        resolve();
      }, 10);
    });
  });

  test('non-expired pastes are still accessible', () => {
    const paste = pastebin.create('Long-lived', 60000); // 60 second TTL
    expect(pastebin.get(paste.id)).not.toBeNull();
    expect(pastebin.get(paste.id)!.content).toBe('Long-lived');
  });
});
