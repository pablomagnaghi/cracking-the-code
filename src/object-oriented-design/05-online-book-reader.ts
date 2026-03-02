// 07.05. Online Book Reader
//
// Design the data structures for an online book reader system.
//
// Approach:
//   - Book holds an id, title, author, and content (array of pages).
//   - User represents a reader with an id, name, and reading history.
//   - Library stores the collection of books and supports add, remove, and
//     search by title.
//   - OnlineReaderSystem ties everything together: it manages a Library and
//     a set of Users, tracks the active user and active book, and maintains
//     a current page pointer for reading navigation (next/prev page).
//
// Example:
//   const system = new OnlineReaderSystem();
//   system.addBook(new Book(1, 'Clean Code', 'Robert C. Martin', ['...']));
//   system.addUser(new User(1, 'Alice'));
//   system.setActiveUser(1);
//   system.setActiveBook(1);
//   system.getCurrentPage(); // page 0 content
//
// Constraints:
//   - Only one book and one user can be active at a time.
//   - Page navigation is bounded by 0 and the last page index.
//   - Searching for a non-existent book or user returns undefined.

export class Book {
  readonly id: number;
  readonly title: string;
  readonly author: string;
  readonly pages: string[];

  constructor(id: number, title: string, author: string, pages: string[]) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
  }

  getNumPages(): number {
    return this.pages.length;
  }

  getPage(index: number): string | undefined {
    if (index < 0 || index >= this.pages.length) return undefined;
    return this.pages[index];
  }
}

export class User {
  readonly id: number;
  readonly name: string;
  private booksRead: Set<number> = new Set();

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  markBookAsRead(bookId: number): void {
    this.booksRead.add(bookId);
  }

  hasRead(bookId: number): boolean {
    return this.booksRead.has(bookId);
  }

  getBooksRead(): number[] {
    return [...this.booksRead];
  }
}

export class Library {
  private books: Map<number, Book> = new Map();

  addBook(book: Book): void {
    this.books.set(book.id, book);
  }

  removeBook(bookId: number): boolean {
    return this.books.delete(bookId);
  }

  getBook(bookId: number): Book | undefined {
    return this.books.get(bookId);
  }

  searchByTitle(query: string): Book[] {
    const lowerQuery = query.toLowerCase();
    return [...this.books.values()].filter((b) =>
      b.title.toLowerCase().includes(lowerQuery)
    );
  }

  size(): number {
    return this.books.size;
  }
}

export class OnlineReaderSystem {
  private library: Library = new Library();
  private users: Map<number, User> = new Map();
  private activeUser?: User;
  private activeBook?: Book;
  private currentPage: number = 0;

  // Book management
  addBook(book: Book): void {
    this.library.addBook(book);
  }

  removeBook(bookId: number): boolean {
    if (this.activeBook?.id === bookId) {
      this.activeBook = undefined;
      this.currentPage = 0;
    }
    return this.library.removeBook(bookId);
  }

  getBook(bookId: number): Book | undefined {
    return this.library.getBook(bookId);
  }

  searchBooks(query: string): Book[] {
    return this.library.searchByTitle(query);
  }

  // User management
  addUser(user: User): void {
    this.users.set(user.id, user);
  }

  removeUser(userId: number): boolean {
    if (this.activeUser?.id === userId) {
      this.activeUser = undefined;
    }
    return this.users.delete(userId);
  }

  getUser(userId: number): User | undefined {
    return this.users.get(userId);
  }

  // Active state
  setActiveUser(userId: number): boolean {
    const user = this.users.get(userId);
    if (!user) return false;
    this.activeUser = user;
    return true;
  }

  getActiveUser(): User | undefined {
    return this.activeUser;
  }

  setActiveBook(bookId: number): boolean {
    const book = this.library.getBook(bookId);
    if (!book) return false;
    this.activeBook = book;
    this.currentPage = 0;
    return true;
  }

  getActiveBook(): Book | undefined {
    return this.activeBook;
  }

  // Reading navigation
  getCurrentPage(): string | undefined {
    return this.activeBook?.getPage(this.currentPage);
  }

  getCurrentPageNumber(): number {
    return this.currentPage;
  }

  nextPage(): boolean {
    if (!this.activeBook) return false;
    if (this.currentPage < this.activeBook.getNumPages() - 1) {
      this.currentPage++;
      return true;
    }
    return false;
  }

  prevPage(): boolean {
    if (!this.activeBook) return false;
    if (this.currentPage > 0) {
      this.currentPage--;
      return true;
    }
    return false;
  }
}
