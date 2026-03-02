// 09.08. Pastebin
//
// Design a system like Pastebin, where a user can enter a piece of text
// and get a randomly generated URL to access it.
//
// Approach:
//   Store pastes in an in-memory map keyed by a randomly generated short
//   URL slug. The slug is generated using a base-62 encoding of random
//   bytes, producing compact identifiers. Each paste tracks creation time
//   and an optional expiration. The Pastebin class provides create, get,
//   and delete operations, and automatically filters out expired pastes
//   on access.
//
// Example:
//   const paste = pastebin.create('Hello, world!')
//   pastebin.get(paste.id) => { id, content: 'Hello, world!', createdAt, ... }

export interface Paste {
  id: string;
  content: string;
  createdAt: Date;
  expiresAt: Date | null;
}

export class Pastebin {
  private pastes: Map<string, Paste> = new Map();
  private slugLength: number;

  constructor(slugLength: number = 8) {
    this.slugLength = slugLength;
  }

  create(content: string, ttlMs?: number): Paste {
    const id = this.generateSlug();
    const now = new Date();
    const paste: Paste = {
      id,
      content,
      createdAt: now,
      expiresAt: ttlMs ? new Date(now.getTime() + ttlMs) : null,
    };
    this.pastes.set(id, paste);
    return paste;
  }

  get(id: string): Paste | null {
    const paste = this.pastes.get(id);
    if (!paste) return null;

    // Check expiration
    if (paste.expiresAt && paste.expiresAt.getTime() < Date.now()) {
      this.pastes.delete(id);
      return null;
    }

    return paste;
  }

  delete(id: string): boolean {
    return this.pastes.delete(id);
  }

  getCount(): number {
    return this.pastes.size;
  }

  private generateSlug(): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let slug = '';

    // Ensure uniqueness by regenerating on collision
    do {
      slug = '';
      for (let i = 0; i < this.slugLength; i++) {
        slug += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    } while (this.pastes.has(slug));

    return slug;
  }
}
