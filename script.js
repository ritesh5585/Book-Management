document.addEventListener('DOMContentLoaded', function(){
     let books = JSON.parse(localStorage.getItem('books')) || [];

     //accessing element from dom 
     const home = document.getElementById('actionbtn');
     const showBtn = document.getElementById('showBtn');
     const addBtn = document.getElementById('addBtn');
     const addContainer = document.getElementById('addContainer');
     const submit = document.getElementById('submit');
     const storeBook = document.getElementById('storebook');
     const bookList = document.getElementById('bookList');
     const closeBtn = document.getElementById('closeBtn');
    let userInput = prompt("Please enter your name:");
    var h1 = document.querySelector('h1');

    function updateWelcomeMessage() {
        h1.textContent = "Welcome, " + userInput;
        console.log(h1.textContent);
        // Append the h1 element to the top of the body or another container
        const container = document.getElementsByClassName('container')[0];
        container.insertBefore(h1, container.firstChild);
        console.log('here');
    }
    updateWelcomeMessage();

    document.addEventListener("DOMContentLoaded", updateWelcomeMessage);

     //using eventlistener to show add form
    addBtn.addEventListener('click', function(){
        addContainer.style.display = 'flex';
        home.style.display = 'none';
        storeBook.style.display = 'none';
    });
    
    showBtn.addEventListener('click', function(){
        storeBook.style.display = 'flex';
        home.style.display = 'none';
        addContainer.style.display = 'none';
    })
    closeBtn.addEventListener('click', function(){
        storeBook.style.display = 'none';
        addContainer.style.display = 'none';
        home.style.display = 'flex';
    });

    //submit button functionality
    submit.addEventListener('click', function(e){
        e.preventDefault();
        addBooks();
        console.log('submit button clicked');   
    })
    // button functionality with enter key press
    submit.addEventListener('keydown', function(e){
        if(e.key === 'Enter'){
            console.log('enter key pressed')
            e.preventDefault();
            addBooks();
        }
    })

    function addBooks(){
        const title = document.getElementById('bookTitle').value;
        const author = document.getElementById('bookAuthor').value;
        const year = document.getElementById('bookYear').value;

        if(title && author && year){
            //create book object
            const book = {
                id: Date.now(),
                title: title,
                author: author,
                year: year
            };

            books.push(book);
            //save books to local storage 
            localStorage.setItem('books', JSON.stringify(books));

            // after pushing books to store book the add container should be emty
            document.getElementById('bookTitle').value = '';
            document.getElementById('bookAuthor').value = '';
            document.getElementById('bookYear').value = '';
            //then hide the add container and show the home container

            addContainer.style.display = 'none';
            home.style.display = 'flex';
            console.log(books);
        }
    }


    //get the books in the store and render it to the book list
    submit.addEventListener('click', renderBooks);
    // showBtn.addEventListener('click', renderbooks);
    function renderBooks(){
        bookList.innerHTML = '';
        if(books.length === 0){
            bookList.innerHTML = '<p>No books available. Please add some books.</p>';
        }
        else{
            books.forEach(book => {
                const li = document.createElement('li');
                  li.innerHTML = `
                            <div>
                                <strong>${book.title}</strong> by ${book.author} (${book.year})
                            </div>
                            <button class="delete-btn" data-id="${book.id}">Delete</button>
                        `;
                        bookList.appendChild(li);
            })
        }
    }

    bookList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const bookId = parseInt(event.target.getAttribute('data-id'));
            deleteBook(bookId);
        }
    });
    
//functionality foe deleting books
function deleteBook(id) {
                if (confirm('Are you sure you want to delete this book?')) {
                    // Filter out the book with the given id
                    books = books.filter(book => book.id !== id);
                    
                    // Update localStorage
                    localStorage.setItem('books', JSON.stringify(books));
                    
                    // Re-render the book list
                    renderBooks();
                }
            }  

});

