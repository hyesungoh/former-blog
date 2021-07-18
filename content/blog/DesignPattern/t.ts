interface Aggerate {
  iterator: () => myIterator;
}

interface myIterator {
  hasNext: () => boolean;
  next: () => object;
}

class Book {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }

  getName = (): string => {
    return this.name;
  };
}

class BookShelf implements Aggerate {
  private books: Book[];
  private last: number;

  constructor(maxsize: number) {
    this.books = new Book[maxsize]();
  }

  getBookAt = (index: number): Book => {
    return this.books[index];
  };

  appendBook = (book: Book) => {
    this.books[this.last] = book;
    this.last++;
  };

  getLength = () => {
    return this.last;
  };

  iterator = () => {
    return new BookShelfIterator(this);
  };
}

class BookShelfIterator implements myIterator {
  private bookShelf: BookShelf;
  private index: number;

  constructor(bookShelf: BookShelf) {
    this.bookShelf = bookShelf;
    this.index = 0;
  }

  hasNext = () => {
    return this.index < this.bookShelf.getLength() ? true : false;
  };

  next = () => {
    const book: Book = this.bookShelf.getBookAt(this.index);
    this.index++;
    return book;
  };
}

class Main {
  main = () => {
    const bookShelf: BookShelf = new BookShelf(4);
    bookShelf.appendBook(new Book('Apple'));
    bookShelf.appendBook(new Book('Banana'));
    bookShelf.appendBook(new Book('Chicken'));
    bookShelf.appendBook(new Book('Diamond'));

    const it: myIterator = bookShelf.iterator();
    while (it.hasNext()) {
      const book: Book = it.next() as Book;
      console.log(book.getName());
    }
  };
}
