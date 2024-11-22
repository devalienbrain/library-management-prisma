## Library Management System (Back-end) Prisma ORM Server

## Important Links

- [Live Link]()

## Book CRUD Operations
- Create a new book record in the library’s database [Endpoint: POST /api/books]
- Retrieve a list of all books in the library [Endpoint: GET /api/books]
- Fetches details of a specific book by its bookId [Endpoint: GET /api/books/:bookId]
- Updates information of an existing book by its bookId [Endpoint: PUT /api/books/:bookId]
- Deletes a book from the library by its bookId [Endpoint: DELETE /api/books/:bookId]

## Member CRUD Operations
- Create a new member record in the library’s database [Endpoint: POST /api/members]
- Retrieve a list of all memebers in the library [Endpoint: GET /api/memebers]
- Fetches details of a specific memeber by its memeberId [Endpoint: GET /api/memebers/:memeberId]
- Updates information of an existing memeber by its memeberId [Endpoint: PUT /api/memebers/:memeberId]
- Deletes a memeber from the library by its memeberId [Endpoint: DELETE /api/memebers/:memeberId]

## To run the server
- tsc
- node dist/server.js

## Technologies Used
- Prisma ORM
- Node.js
- PostgreSQL
- Express.js
- TypeScript