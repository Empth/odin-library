const myLibrary = [];

function Book(title, author, numPages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
    this.id = crypto.randomUUID();
    this.info = () => {console.log(this.title+" by "+this.author+", "+this.numPages+" pages, "+(this.read ? "" : "not")+" read");};
}

function addBookToLibrary(title, author, numPages) {
  // take params, create a book then store it in the array
  const newBook = new Book(title, author, numPages, false);
  myLibrary.push(newBook);
}

const container = document.querySelector(".container")

function displayLibrary() {
    for (const book of myLibrary) {
        const divBook = document.createElement("div");
        divBook.classList.add("card");
        const title = document.createElement("p");
        title.classList.add("title")
        title.textContent = book.title
        const author = document.createElement("p");
        author.classList.add("author")
        author.textContent = book.author;
        divBook.appendChild(title);
        divBook.appendChild(author);
        container.appendChild(divBook);
    }
}

const defaultBooks = [
  ["Moby Dick", "Herman Melville", 635],
  ["Pride and Prejudice", "Jane Austen", 432],
  ["1984", "George Orwell", 328],
  ["To Kill a Mockingbird", "Harper Lee", 281],
  ["The Great Gatsby", "F. Scott Fitzgerald", 180],
  ["War and Peace", "Leo Tolstoy", 1225],
  ["Ulysses", "James Joyce", 730],
  ["The Hobbit", "J.R.R. Tolkien", 310],
  ["Crime and Punishment", "Fyodor Dostoevsky", 430],
  ["Jane Eyre", "Charlotte Brontë", 500],
  ["The Catcher in the Rye", "J.D. Salinger", 214],
  ["Brave New World", "Aldous Huxley", 311]
];

defaultBooks.forEach(([title, author, pages]) => addBookToLibrary(title, author, pages));

displayLibrary();