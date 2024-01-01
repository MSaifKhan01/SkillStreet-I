<h1 align="center"><span style="color: #5C6AC4;">Notes-Management</span></h1>


Welcome to SkillStreet-I! This Node.js application serves as a backend for user and note management. The application is built with Express.js, MongoDB, and utilizes JWT for authentication. Below, you'll find information on how to run the server, API documentation using Swagger, details about the application's structure, and the relation between users and notes.

###  **Deployed Link:** [https://skillstreet-i.onrender.com](https://skillstreet-i.onrender.com)

## Table of Contents

- [Installation](#Installation)
- [Technologies Used](#Technologies-Used)
- [Swagger Documentation](#Swagger-Documentation)
- [Testing](#Testing)
- [API Endpoints](#API-Endpoints)
- [User-Note Relationship](#User-Note-Relationship)


## Installation

1. Clone the repository.

```bash
git clone https://github.com/MSaifKhan01/SkillStreet-I.git
```

2. Install dependencies.

```bash
cd SkillStreet-I
npm install
```

3. Set up environment variables.

Create a `.env` file in the root directory and add the following:

```env
JWT_Secret=your_secret_key
mongoUrl=your database link
```

4. Run the server.

```bash
npm run server
```

The server will run Locally on [http://localhost:4000/](http://localhost:4000/).

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Bcrypt
- JSON Web Token (JWT)
- Swagger for API Documentation
- Jest for Testing

## Swagger Documentation

Explore the API endpoints using Swagger documentation. Visit [https://skillstreet-i.onrender.com/docs](https://skillstreet-i.onrender.com/docs) to access the Swagger UI. This documentation provides detailed information about each endpoint, request parameters, and responses.

## Testing

The application uses Jest for testing. Run the tests using the following command:

```bash
npm test
```

## API-Endpoints

### User Management

#### 1. Signup

- **Method:** `POST`
- **Endpoint:** `/User/Signup`
- **Description:** Register a new user.

#### 2. Login

- **Method:** `POST`
- **Endpoint:** `/User/Login`
- **Description:** Log in a user.

### Note Management

#### 1. Add Note

- **Method:** `POST`
- **Endpoint:** `/Note/Add`
- **Security:** Auth
- **Description:** Add a new note.

#### 2. Get All Notes

- **Method:** `GET`
- **Endpoint:** `/Note/All-Notes`
- **Security:** Auth
- **Description:** Get all notes.

#### 3. Get Single Note

- **Method:** `GET`
- **Endpoint:** `/Note/Single-Note/:id`
- **Security:** Auth
- **Description:** Get details of a single note.

#### 4. Update Note

- **Method:** `PUT`
- **Endpoint:** `/Note/Update-Note/:id`
- **Security:** Auth
- **Description:** Update a note.

#### 5. Delete Note

- **Method:** `DELETE`
- **Endpoint:** `/Note/Delete-Note/:id`
- **Security:** Auth
- **Description:** Delete a note.

## User-Note-Relationship

- Users can create, update, and delete their own notes.
- Each note is associated with a specific user.
- Authentication (JWT) ensures that users can only access and modify their own notes.
- Users cannot access or modify notes created by other users.



You can also visit my [portfolio](https://msaifkhan01.github.io/) to see my other projects.