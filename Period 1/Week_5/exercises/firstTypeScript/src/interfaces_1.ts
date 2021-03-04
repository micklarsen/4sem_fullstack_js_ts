let http = require("http");

//Create a TypeScript interface IBook, which should encapsulate information about a book, including:
interface IBook {
    title: string;
    readonly author: string; //e) Change the interface to make author readonly - Verify the new behaviour.
    published?: Date; //d) Change the interface to make published and pages become optional - Verify the new behaviour.
    pages: number;
}

let aBook: IBook = {
    title: "The Lord Of The Rings - Fellowship of the Ring",
    author: "JRR Tolkien",
    //published: new Date(),
    pages: 423,
}

//Create a function that takes an IBook instance and test it with an object instance.
function printBook(book: IBook) {
    console.log(book);
}

printBook(aBook);

/*Given the example above, explain what is meant by the term Duck Typing, when TypeScript interfaces are discussed.
Duck Typing makes typescript Type safe.
It means, that every book that is declared must have the same properties as the 'IBook' interface - no more, no less!
*/

//f) Create a class Book and demonstrate the "Java way" of implementing an interface.
class Book implements IBook {
    constructor(
        private _title: string,
        private readonly _author: string,
        private _published: Date,
        private _pages: number
    ) { };

    get title() {
        return this._title;
    }
    set title(title: string) {
        this._title = title;
    }
    get author() {
        return this._author;
    }

    get published() {
        return this._published;
    }
    set published(published: Date) {
        this._published = published;
    }
    get pages() {
        return this._pages;
    }
    set pages(pages: number) {
        this._pages = pages;
    }
}


