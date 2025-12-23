# User Registration API

**Endpoint:** `POST /api/user/register`  
**Base URL:** `base-url`

---

## Request Body

**Content-Type:** `application/json`

| Field          | Type   | Required | Description                       |
|----------------|--------|----------|-----------------------------------|
| first_name     | string | Yes      | User's first name                 |
| last_name      | string | Yes      | User's last name                  |
| profile_picture     | string | No     | users picture                |
| phone_number   | string | Yes      | User's phone number               |
| university_id  | string | Yes      | User's university ID              |
| department     | string | Yes      | User's department                 |
| batch          | string | Yes      | User's batch/year                 |
| role           | string | Yes      | User role (e.g.,default "student") enum = ['student', 'staff', 'admin', 'security_staff', 'security_chief']      |
| email          | string | Yes      | User's university email address             |
| password       | string | Yes      | User's password                   |

**Example Request:**

```json
{
  "first_name": "Abdulbasit",
  "last_name": "Nezif",
  "phone_number": "+251912345678",
  "university_id": "ugr/30026/15",
  "department": "software engineering",
  "batch": "2025",
  "role": "student",
  "email": "abdulbasit.nezif@astu.edu.et",
  "password": "StrongPassword123!"
}
```
**Success response:**

```json
{
  "ok": true,
  "status": 201,
  "message": "Signup successful",
  "data": {
    "user": {
      "first_name": "Abdulhafiz",
      "last_name": "Mohammed",
      "phone_number": "+251912345678",
      "university_id": "ugr/30030/14",
      "department": "software engineering",
      "batch": "2025",
      "role": "student",
      "email": "abdulhafiz.muhammed@astu.edu.et",
      "_id": "694a74e7dcba801d365afda8",
      "createdAt": "2025-12-23T10:54:31.812Z",
      "updatedAt": "2025-12-23T10:54:31.812Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error response 1:**
```json
{
  "ok": false,
  "status": 400,
  "message": "Email already in use"
}
```

**Error response 2:**
```json
{
    "ok": false,
    "status": 400,
    "message": "Validation failed",
    "errors": {
        "first_name": "\"first_name\" is required",
        "last_name": "\"last_name\" is required",
        "phone_number": "\"phone_number\" is required",
        "university_id": "\"university_id\" is required",
        "department": "\"department\" is required",
        "batch": "\"batch\" is required",
        "email": "\"email\" is required",
        "password": "\"password\" is required"
    }
}
```