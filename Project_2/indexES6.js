console.log("this is ES^ version of index.js");
showBooks();
class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    };

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        } else {
            return true;
        }
    };

    show(type, displaymessage) {
        let message = document.getElementById('message');
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                 <strong>Message:</strong> ${displaymessage}
                                 <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                 </div>`;

        setTimeout(() => {
            message.innerHTML = "";

        }, 2000);
    };
}

// to show the list of book through local storage

function showBooks() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let html = " ";
    notesObj.forEach((element, index) => {

        html += `<tr>
              <td> ${element.name}</td >
              <td>${element.author}</td>
              <td>${element.type}</td>
              <td> <button id="${index}" onclick="deleteBook(this.id)" class="btn btn-primary">Delete Book</button></td>
              </tr >`
    })

    let tableBody = document.getElementById('tableBody');
    if (notesObj.length != 0) {
        tableBody.innerHTML = html;
    } else {
        tableBody.innerHTML = `Nothing to show! Use "Add Book" section to add book.`;
    }

    if (notesObj.length > 5) {
        tableBody.style.overflowY = "auto";
    } else {
        tableBody.style.overflowY = "hidden";
    }

}

// to delete a book
function deleteBook(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];

    } else {
        notesobj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showBooks();
}

// Add submit event listerner to libraryForm

let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log("You have submitted library form");
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;

    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        type = fiction.value;
    } else if (programming.checked) {
        type = programming.value;
    } else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    console.log(book);


    let display = new Display();

    if (display.validate(book)) {

        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }

        notesObj.push(book);
        localStorage.setItem("notes", JSON.stringify(notesObj));
       /* console.log(notesObj);*/
        /*  display.add(book);*/
        showBooks();
        display.clear();
        display.show('success', ' Your book has been successfully added.');
    } else {
        display.show('danger', ' Sorry you cannot add this book.');
        display.clear();
    }
    e.preventDefault();
}