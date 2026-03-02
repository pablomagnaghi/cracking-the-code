import {
  Book,
  User,
  Library,
  OnlineReaderSystem,
} from '../../src/object-oriented-design/05-online-book-reader';

describe('Online Book Reader', () => {
  test('Book stores metadata and pages', () => {
    const book = new Book(1, 'Clean Code', 'Robert C. Martin', ['Page 1', 'Page 2', 'Page 3']);
    expect(book.title).toBe('Clean Code');
    expect(book.author).toBe('Robert C. Martin');
    expect(book.getNumPages()).toBe(3);
    expect(book.getPage(0)).toBe('Page 1');
    expect(book.getPage(3)).toBeUndefined();
  });

  test('User tracks read books', () => {
    const user = new User(1, 'Alice');
    expect(user.hasRead(1)).toBe(false);
    user.markBookAsRead(1);
    expect(user.hasRead(1)).toBe(true);
    expect(user.getBooksRead()).toEqual([1]);
  });

  test('Library adds, removes, and searches books', () => {
    const lib = new Library();
    const b1 = new Book(1, 'Clean Code', 'Martin', ['p1']);
    const b2 = new Book(2, 'Clean Architecture', 'Martin', ['p1']);
    lib.addBook(b1);
    lib.addBook(b2);

    expect(lib.size()).toBe(2);
    expect(lib.getBook(1)).toBe(b1);
    expect(lib.searchByTitle('clean')).toHaveLength(2);
    expect(lib.searchByTitle('architecture')).toHaveLength(1);

    lib.removeBook(1);
    expect(lib.size()).toBe(1);
    expect(lib.getBook(1)).toBeUndefined();
  });

  test('OnlineReaderSystem manages users and books', () => {
    const system = new OnlineReaderSystem();
    system.addBook(new Book(1, 'Book A', 'Author', ['p1', 'p2']));
    system.addUser(new User(1, 'Alice'));

    expect(system.getBook(1)?.title).toBe('Book A');
    expect(system.getUser(1)?.name).toBe('Alice');
  });

  test('OnlineReaderSystem sets active user and book', () => {
    const system = new OnlineReaderSystem();
    system.addBook(new Book(1, 'Book A', 'Author', ['p1', 'p2']));
    system.addUser(new User(1, 'Alice'));

    expect(system.setActiveUser(1)).toBe(true);
    expect(system.setActiveUser(99)).toBe(false);
    expect(system.getActiveUser()?.name).toBe('Alice');

    expect(system.setActiveBook(1)).toBe(true);
    expect(system.setActiveBook(99)).toBe(false);
    expect(system.getActiveBook()?.title).toBe('Book A');
  });

  test('OnlineReaderSystem navigates pages', () => {
    const system = new OnlineReaderSystem();
    system.addBook(new Book(1, 'Book', 'Auth', ['Page 0', 'Page 1', 'Page 2']));
    system.addUser(new User(1, 'Reader'));
    system.setActiveUser(1);
    system.setActiveBook(1);

    expect(system.getCurrentPageNumber()).toBe(0);
    expect(system.getCurrentPage()).toBe('Page 0');

    expect(system.nextPage()).toBe(true);
    expect(system.getCurrentPageNumber()).toBe(1);
    expect(system.getCurrentPage()).toBe('Page 1');

    expect(system.nextPage()).toBe(true);
    expect(system.getCurrentPageNumber()).toBe(2);

    expect(system.nextPage()).toBe(false); // at last page
    expect(system.getCurrentPageNumber()).toBe(2);

    expect(system.prevPage()).toBe(true);
    expect(system.getCurrentPageNumber()).toBe(1);
  });

  test('OnlineReaderSystem prevPage returns false at first page', () => {
    const system = new OnlineReaderSystem();
    system.addBook(new Book(1, 'B', 'A', ['p1']));
    system.setActiveBook(1);
    expect(system.prevPage()).toBe(false);
  });

  test('OnlineReaderSystem navigation without active book returns false', () => {
    const system = new OnlineReaderSystem();
    expect(system.nextPage()).toBe(false);
    expect(system.prevPage()).toBe(false);
    expect(system.getCurrentPage()).toBeUndefined();
  });

  test('OnlineReaderSystem removeBook clears active book if it was active', () => {
    const system = new OnlineReaderSystem();
    system.addBook(new Book(1, 'B', 'A', ['p1']));
    system.setActiveBook(1);
    expect(system.getActiveBook()?.id).toBe(1);

    system.removeBook(1);
    expect(system.getActiveBook()).toBeUndefined();
  });

  test('OnlineReaderSystem searches books by title', () => {
    const system = new OnlineReaderSystem();
    system.addBook(new Book(1, 'TypeScript Handbook', 'MS', ['p1']));
    system.addBook(new Book(2, 'JavaScript Guide', 'MDN', ['p1']));

    expect(system.searchBooks('script')).toHaveLength(2);
    expect(system.searchBooks('type')).toHaveLength(1);
  });
});
