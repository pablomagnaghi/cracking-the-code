// 13.01. Private Constructor
//
// In terms of inheritance, what is the effect of keeping a constructor private?
// A class with a private constructor cannot be subclassed because the subclass
// constructor needs to call the parent constructor. This pattern is used to
// enforce controlled instantiation such as singletons and factories.
//
// Approach:
//   Demonstrate the Singleton pattern using a private constructor that ensures
//   only one instance exists. Also demonstrate the Factory pattern where a
//   class with a private constructor delegates creation to static factory
//   methods, allowing controlled construction with validation.
//
// Example:
//   const a = Singleton.getInstance();
//   const b = Singleton.getInstance();
//   a === b; // true
//
//   const conn = DatabaseFactory.createConnection('postgres');
//   conn.type; // 'postgres'
//
// Constraints:
//   - Singleton.getInstance() always returns the same instance
//   - DatabaseFactory.createConnection() validates the type argument
//   - Direct instantiation via `new` is not allowed from outside

export class Singleton {
  private static instance: Singleton | null = null;
  private readonly createdAt: number;

  private constructor() {
    this.createdAt = Date.now();
  }

  static getInstance(): Singleton {
    if (Singleton.instance === null) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  getCreatedAt(): number {
    return this.createdAt;
  }

  /** Reset for testing purposes only */
  static resetInstance(): void {
    Singleton.instance = null;
  }
}

export interface DatabaseConnection {
  readonly type: string;
  readonly host: string;
  readonly port: number;
  isConnected(): boolean;
  disconnect(): void;
}

export class DatabaseFactory {
  private static readonly DEFAULTS: Record<string, { host: string; port: number }> = {
    postgres: { host: 'localhost', port: 5432 },
    mysql: { host: 'localhost', port: 3306 },
    mongodb: { host: 'localhost', port: 27017 },
  };

  private constructor() {
    // Prevent direct instantiation
  }

  static createConnection(type: string, host?: string, port?: number): DatabaseConnection {
    const defaults = DatabaseFactory.DEFAULTS[type];
    if (!defaults) {
      throw new Error(`Unsupported database type: ${type}`);
    }

    const finalHost = host ?? defaults.host;
    const finalPort = port ?? defaults.port;
    let connected = true;

    return {
      type,
      host: finalHost,
      port: finalPort,
      isConnected: () => connected,
      disconnect: () => {
        connected = false;
      },
    };
  }

  static getSupportedTypes(): string[] {
    return Object.keys(DatabaseFactory.DEFAULTS);
  }
}
