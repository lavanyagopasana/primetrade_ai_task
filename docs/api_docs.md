🧾 api_docs.md – Primetrade API Documentation
📘 Overview

This API provides authentication and CRUD operations for managing users and entities.
It is built with FastAPI, uses SQLite as the database, and JWT tokens for authentication.

🛠 Base URL
http://127.0.0.1:8000

🔐 Authentication
1️⃣ Register a User

Endpoint: /register
Method: POST
Description: Creates a new user in the system.

Request Body (JSON):

{
  "username": "lavanya",
  "email": "lavanya@example.com",
  "password": "1234"
}


Response (201 Created):

{
  "message": "User registered successfully"
}

2️⃣ Login User

Endpoint: /login
Method: POST
Description: Authenticates the user and returns a JWT access token.

Request Body (JSON):

{
  "email": "lavanya@example.com",
  "password": "1234"
}


Response (200 OK):

{
  "access_token": "<your-jwt-token>",
  "token_type": "bearer"
}

👤 User Profile
3️⃣ Get User Profile

Endpoint: /user/profile
Method: GET
Auth Required: ✅ Yes (Bearer Token)
Description: Returns details of the currently logged-in user.

Headers:

Authorization: Bearer <your-jwt-token>


Response (200 OK):

{
  "username": "lavanya",
  "email": "lavanya@example.com"
}

📦 Entities Management
4️⃣ Get All Entities

Endpoint: /entities
Method: GET
Auth Required: ✅ Yes

Response (200 OK):

[
  {
    "id": 1,
    "title": "Entity A",
    "description": "First entity"
  },
  {
    "id": 2,
    "title": "Entity B",
    "description": "Second entity"
  }
]

5️⃣ Create an Entity

Endpoint: /entities
Method: POST
Auth Required: ✅ Yes

Request Body:

{
  "title": "New Entity",
  "description": "Entity details"
}


Response (201 Created):

{
  "message": "Entity created successfully"
}

6️⃣ Update an Entity

Endpoint: /entities/{id}
Method: PUT
Auth Required: ✅ Yes

Request Body:

{
  "title": "Updated Entity",
  "description": "Updated description"
}


Response (200 OK):

{
  "message": "Entity updated successfully"
}

7️⃣ Delete an Entity

Endpoint: /entities/{id}
Method: DELETE
Auth Required: ✅ Yes

Response (200 OK):

{
  "message": "Entity deleted successfully"
}

⚙️ Error Responses
Status Code	Description
400	Invalid input data
401	Unauthorized (invalid/missing token)
404	Resource not found
500	Internal server error
📄 Notes

All protected endpoints require a valid JWT token in the Authorization header.

Tokens expire after a fixed duration (e.g., 1 hour).

Database used: SQLite (main.db)

Framework: FastAPI

ORM: SQLAlchemy