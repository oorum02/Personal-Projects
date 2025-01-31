let library = JSON.parse(localStorage.getItem('library')) || [];

function addBook() {
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const year = document.getElementById('year').value.trim();

    if (title && author && year) {
        library.push({
            id: Date.now(),
            title,
            author,
            year,
            rating: 0 // Default rating
        });
        saveLibrary();
        displayBooks();
        clearForm();
    } else {
        alert("📜 Please fill out all fields before adding!");
    }
}

function displayBooks(filteredBooks = library) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    filteredBooks.forEach(book => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>${book.title}</strong> by ${book.author} (${book.year})</span>
            <div>
                ${generateDragonRating(book.id, book.rating)}
                <button onclick="viewDetails(${book.id})">🔍 Details</button>
                <button class="delete-btn" onclick="deleteBook(${book.id})">❌ Delete</button>
            </div>
        `;
        bookList.appendChild(li);
    });
}

function generateDragonRating(bookId, rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<span class="dragon" onclick="rateBook(${bookId}, ${i})">${i <= rating ? '🐉' : '🌕'}</span>`;
    }
    return `<div class="rating">${stars}</div>`;
}

function rateBook(bookId, rating) {
    const book = library.find(b => b.id === bookId);
    if (book) {
        book.rating = rating;
        saveLibrary();
        displayBooks();
    }
}

function deleteBook(bookId) {
    library = library.filter(b => b.id !== bookId);
    saveLibrary();
    displayBooks();
}

function saveLibrary() {
    localStorage.setItem('library', JSON.stringify(library));
}

displayBooks();
