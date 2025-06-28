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
}

function addBookToLibrary(title, author, numPages, read) {
  // take params, create a book then store it in the array
  const newBook = new Book(title, author, numPages, read);
  myLibrary.push(newBook);
}

const container = document.querySelector(".container")

function resetLibrary() {
    // reset books in container DOM
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function deleteBook(uuid) {
    // deletes book with uuid from myLibrary
    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i]
        if (book.id === uuid) {
            myLibrary.splice(i, 1);
            break;
        }
    }
}

function getBook(uuid) {
    // get book with uuid ow returns null
    for (const book of myLibrary) {
        if (book.id === uuid) {
            return book
        }
    }
    return null
}

function displayLibrary() {
    resetLibrary();
    for (const book of myLibrary) {

        const divBook = document.createElement("div");
        divBook.classList.add("card");

        divBook.setAttribute("data-uuid", book.id);

        const title = document.createElement("p");
        title.classList.add("title")
        title.textContent = book.title

        const author = document.createElement("p");
        author.classList.add("author")
        author.textContent = book.author === "" ? " " : book.author;

        const haveRead = document.createElement("p");
        haveRead.classList.add("have-read")
        haveRead.textContent = book.read ? "Read" : "Not Read";

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete");

        const readButton = document.createElement("button");
        readButton.classList.add("read");
        readButton.textContent = "Make read";

        const cardHeader = document.createElement("div");
        cardHeader.classList.add("card-header");

        cardHeader.appendChild(readButton);
        cardHeader.appendChild(deleteButton);
        
        divBook.appendChild(cardHeader);
        divBook.appendChild(title);
        divBook.appendChild(author);
        divBook.appendChild(haveRead);

        deleteButton.addEventListener("click", e => {
            let parentCard = deleteButton.parentElement.parentElement;
            let uuid = parentCard.dataset.uuid;
            deleteBook(uuid);
            displayLibrary();
        });

        readButton.addEventListener("click", e => {
            let parentCard = readButton.parentElement.parentElement;
            let uuid = parentCard.dataset.uuid;
            const book = getBook(uuid);
            book.changeToRead();
            displayLibrary();
        })

        container.appendChild(divBook);
    }
}

document.getElementById("my-form").addEventListener("submit", e => {
    e.preventDefault();
    form = document.querySelector("#my-form");
    let formData = new FormData(form);
    let formObject = Object.fromEntries(formData); // {'title': , 'author':, 'pages':, (optionally appears) 'read': }
    addBookToLibrary(formObject.title, formObject.author, formObject.pages, 'read' in formObject);
    displayLibrary();
    e.target.reset();
});

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

defaultBooks.forEach(([title, author, pages]) => addBookToLibrary(title, author, pages, false));

displayLibrary();

Book.prototype.changeToRead = function () {
  this.read = true;
}