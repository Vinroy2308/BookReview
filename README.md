# Book Review API

## Overview
A RESTful API using Node.js for a basic Book Review system.

## Requirements

### Tech Stack

* Node.js with Express.js
* MongoDB database
* JWT for authentication

## Installation Process

### Clone the Repository
1. Open a terminal and do - ``git clone https://github.com/Vinroy2308/BookReview.git``
2. ``cd BookReview``
3. Open the project in VSCode by doing ``code .`` or use any IDE like WebStorm

### Install Dependencies
1. ``npm install``

### Set Up Environment Variables
1. Create a .env file in same place as .env.example
2. Copy and paste the below content in the .env file
```
MONGO_URI=mongodb+srv://user1:user1@cluster0.9e22moz.mongodb.net/bookReview
PORT=4500
JWT_SECRET=book-review-application-using-nodejs
```

### Run the Server
1. Run ``nodemon server.js`` or ``npm start``

## Testing the APIs
Here I have used Postman to test the REST APIs.

``http://localhost:4500/api/`` is the base route.


### 1. SignUp (``POST /signup``)
#### URL
    POST ``http://localhost:4500/api/auth/signup``
#### Request Body (JSON)
```
{
  "username": "JohnDoe",
  "email": "johndoe@email.com",
  "password": "johnpassword"
}
```
#### Expected Response (201 Created)
```
{
    "message": "JohnDoe is successfully registered in the database"
}
```

### 2. Login (``POST /login``)
#### URL
    POST ``http://localhost:4500/api/auth/login``
#### Request Body (JSON)
```
{
  "email": "johndoe@email.com",
  "password": "johnpassword"
}
```
#### Expected Response (200 OK)
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."
}
```

### 2. Get All Books (``GET /books``)
#### URL
    GET ``http://localhost:4500/api/books``
#### Expected Response (200 OK)
```
{
    "books": [
        {
            "_id": "6843ed2a87d9e01869238f77",
            "title": "Happy Place",
            "author": "Emily Henry",
            "genre": "Romance",
            "description": "A couple pretends to still be together during a vacation with friends, forcing them to confront what went wrong—and what might still be right.",
            "createdAt": "2025-06-07T07:41:30.359Z",
            "updatedAt": "2025-06-07T07:41:30.359Z",
            "__v": 0
        },...
    ]
}
```
#### Request Queries for Pagination and Filters
``localhost:4500/api/books?page=1&limit=5`` Used for Pagination

``localhost:4500/api/books?author=scott`` Filters by Author

``localhost:4500/api/books?genre=Fiction`` Filters by Genre

### 4. Add a new Book (``POST /books``)
#### URL
    POST ``http://localhost:4500/api/books``
#### Request Body (JSON)
```
{
    "title": "Butter",
    "author": "Asako Yuzuki",
    "description": "Inspired by a real case, this novel follows a journalist investigating a woman accused of seducing and killing men with food, exploring gender, power, and appetite in Japanese society.",
    "genre": "Drama"
  }
```
#### Request Headers 
In the Headers section, add ``Authorization`` and the value as 

``Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....``. Copy the token from the ``/login`` response.
#### Expected Response (201 CREATED)
```
{
    "message": "{\n  title: 'Butter',\n  author: 'Asako Yuzuki',\n  genre: 'Drama',\n  description: 'Inspired by a .... added successfully by user 684553041d296912ca9c9977"
}
```

### 5. Get Book Details (``GET /books/:id``)
#### URL
    GET ``http://localhost:4500/api/books/6844788234b6957345e6ca35``
#### Expected Response (200 OK)
```
{
    "book": {
        "_id": "6844788234b6957345e6ca35",
        "title": "Orbital",
        "author": "Samantha Harvey",
        "genre": "Philosophy",
        "description": "A meditative novel set aboard a space station orbiting Earth, exploring the quiet rhythms of life in space and the inner lives of the astronauts through a single day.",
        "createdAt": "2025-06-07T17:36:02.998Z",
        "updatedAt": "2025-06-07T17:36:02.998Z",
        "__v": 0
    },
    "rating": "4.5",
    "reviews": [
        {
            "_id": "68447a86f808e106fcc7443a",
            "bookId": "6844788234b6957345e6ca35",
            "userId": "684477c534b6957345e6ca28",
            "rating": 4.5,
            "review": "The writing is beautiful, but there’s no real plot line. It explores from the astronaut’s perspective, philosophical considerations of the earth and space. It wasn’t for me, but if you like pretty writing there’s a lot of that.",
            "createdAt": "2025-06-07T17:44:38.706Z",
            "updatedAt": "2025-06-07T17:44:38.706Z",
            "__v": 0
        }
    ]
}
```
#### Request Queries for Pagination
``localhost:4500/api/books6844788234b6957345e6ca35?page=1`` Used for Pagination

### 6. Add a new Review (``POST /books/:id/reviews``)
#### URL
    POST ``http://localhost:4500/api/books/6844788234b6957345e6ca35/reviews``
#### Request Body (JSON)
```
{
    "rating": "5",
    "review": "This book is really good and I recommend to any one who is interested in reading."
}
```
#### Request Headers
In the Headers section, add ``Authorization`` and the value as

``Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....``. Copy the token from the ``/login`` response.
#### Expected Response (201 CREATED)
```
{
    "message": "Your review has been added successfully."
}
```

### 7. Update user review (``PUT /reviews/:id``)
#### URL
    POST ``http://localhost:4500/api/reviews/68447a86f808e106fcc7443a``
#### Request Body (JSON)
```
{
    "review": "This book is really good."
}
```
#### Request Headers
In the Headers section, add ``Authorization`` and the value as

``Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....``. Copy the token from the ``/login`` response.
#### Expected Response (201 CREATED)
```
{
    "message": "Your review has been updated successfully."
}
```

### 7. Delete user review (``DELETE /reviews/:id``)
#### URL
    POST ``http://localhost:4500/api/reviews/68447a86f808e106fcc7443a``
#### Request Headers
In the Headers section, add ``Authorization`` and the value as

``Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....``. Copy the token from the ``/login`` response.
#### Expected Response (201 CREATED)
```
{
    "message": "Your review has been deleted successfully."
}
```

### 8. Search books based on Author or Title (``GET /search``)
#### URL
    GET ``http://localhost:4500/api/search?query=emily``
#### Expected Response (200 OK)
```
{
    "books": [
        {
            "_id": "6843ed2a87d9e01869238f77",
            "title": "Happy Place",
            "author": "Emily Henry",
            "genre": "Romance",
            "description": "A couple pretends to still be together during a vacation with friends, forcing them to confront what went wrong—and what might still be right.",
            "createdAt": "2025-06-07T07:41:30.359Z",
            "updatedAt": "2025-06-07T07:41:30.359Z",
            "__v": 0
        }
    ]
}
```
#### Request Queries

``localhost:4500/api/books/search?query=scott`` Filters by Author

``localhost:4500/api/books/search?query=orbi`` Filters by Title

## ER Diagram for Book Review API
![Book Review API ER Diagram](image/BookReviewERDiagram.png)
