# Book Review App

un’app di `libri` in cui si potranno lasciare `recensioni` pubbliche.

## Tables

- books
- reviews

### Books

- id INT AI NN UQ PK
- title VARCHAR(200) NN
- plot TEXT(1000) NN
- cover_image VARCHAR(255) DEFAULT('<https://placehold.co/600x400?text=Image\nNot+Available>')
- author VARCHAR(200) NULL
- year YEAR NULL
- created_at (optional) DATETIME DEFAULT(CURRENT_TIMESTAMP)
- updated_at (optional) DATETIME DEFAULT(CURRENT_TIMESTAMP)

### Reviews

- id INT AI NN UQ PK
- book_id INT FK
- username VARCHAR(100) NN
- vote TINYINT NN
- content TEXT NN
- created_at (optional) DATETIME DEFAULT(CURRENT_TIMESTAMP)
- updated_at (optional) DATETIME DEFAULT(CURRENT_TIMESTAMP)

## API Server

This is an express API server for the books reviews app, it exposes the following endpoints

### Routes

- home: GET '/''
- books: GET '/books' index
- books: GET '/books/:id' show
- books: book review endpoint? 
