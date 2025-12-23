# User Login API

**Endpoint:** `POST /api/user/login`  
**Base URL:** `localhost:8080`

---

## Request Body

**Content-Type:** `application/json`

| Field    | Type   | Required | Description                  |
|----------|--------|----------|------------------------------|
| email    | string | Yes      | User's university email      |
| password | string | Yes      | User's password              |

**Example Request:**

```json
{
  "email": "abdulhafiz.muhammed@astu.edu.et",
  "password": "StrongPassword123!"
}
```

**success response:**

status cose : `200`

```json
{
  "ok": true,
  "status": 200,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "694a74e7dcba801d365afda8",
      "first_name": "Abdulhafiz",
      "last_name": "Mohammed",
      "phone_number": "+251912345678",
      "university_id": "ugr/30030/14",
      "department": "software engineering",
      "batch": "2025",
      "role": "student",
      "email": "abdulhafiz.muhammed@astu.edu.et",
      "createdAt": "2025-12-23T10:54:31.812Z",
      "updatedAt": "2025-12-23T10:54:31.812Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**errror response 1:**

status cose : `400`
```json
{
  "ok": false,
  "status": 400,
  "message": "Incorrect password"
}
```

**errror response 2:**

status cose : `400`
```json
{
  "ok": false,
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "email": "\"email\" is required",
    "password": "\"password\" is required"
  }
}
```