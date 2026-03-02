import { Singleton, DatabaseFactory } from '../../src/java/01-private-constructor';

describe('Singleton', () => {
  beforeEach(() => {
    Singleton.resetInstance();
  });

  test('getInstance returns the same instance on multiple calls', () => {
    const a = Singleton.getInstance();
    const b = Singleton.getInstance();
    expect(a).toBe(b);
  });

  test('getInstance returns an object with a createdAt timestamp', () => {
    const instance = Singleton.getInstance();
    expect(instance.getCreatedAt()).toBeGreaterThan(0);
    expect(typeof instance.getCreatedAt()).toBe('number');
  });

  test('createdAt remains the same across calls', () => {
    const a = Singleton.getInstance();
    const tsA = a.getCreatedAt();
    const b = Singleton.getInstance();
    expect(b.getCreatedAt()).toBe(tsA);
  });

  test('resetInstance allows a new instance to be created', () => {
    const a = Singleton.getInstance();
    Singleton.resetInstance();
    const b = Singleton.getInstance();
    expect(a).not.toBe(b);
  });
});

describe('DatabaseFactory', () => {
  test('creates a postgres connection with defaults', () => {
    const conn = DatabaseFactory.createConnection('postgres');
    expect(conn.type).toBe('postgres');
    expect(conn.host).toBe('localhost');
    expect(conn.port).toBe(5432);
    expect(conn.isConnected()).toBe(true);
  });

  test('creates a mysql connection with custom host and port', () => {
    const conn = DatabaseFactory.createConnection('mysql', 'db.example.com', 3307);
    expect(conn.type).toBe('mysql');
    expect(conn.host).toBe('db.example.com');
    expect(conn.port).toBe(3307);
  });

  test('creates a mongodb connection', () => {
    const conn = DatabaseFactory.createConnection('mongodb');
    expect(conn.type).toBe('mongodb');
    expect(conn.port).toBe(27017);
  });

  test('throws for unsupported database type', () => {
    expect(() => DatabaseFactory.createConnection('oracle')).toThrow(
      'Unsupported database type: oracle',
    );
  });

  test('disconnect marks the connection as not connected', () => {
    const conn = DatabaseFactory.createConnection('postgres');
    expect(conn.isConnected()).toBe(true);
    conn.disconnect();
    expect(conn.isConnected()).toBe(false);
  });

  test('getSupportedTypes returns all supported types', () => {
    const types = DatabaseFactory.getSupportedTypes();
    expect(types).toContain('postgres');
    expect(types).toContain('mysql');
    expect(types).toContain('mongodb');
    expect(types).toHaveLength(3);
  });
});
