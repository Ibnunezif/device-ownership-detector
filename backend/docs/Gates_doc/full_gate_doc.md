
---

# 🚪 Gate Management API Documentation

Base URL:

```
/api/gates
```

Authentication:

* All endpoints require **JWT authentication**
* Some endpoints require **roles**: `security_chief`, `admin`

Headers:

```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

---

## 🔐 Roles & Access Control

| Endpoint        | Role Required          |
| --------------- | ---------------------- |
| Create Gate     | security_chief, admin  |
| Update Gate     | security_chief, admin  |
| Delete Gate     | security_chief, admin  |
| Get All Gates   | security_chief, admin  |
| Get Single Gate | Any authenticated user |

---

## 📌 Gate Object Structure

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "location": "string",
  "createdBy": {
    "id": "string",
    "fullName": "string"
  },
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

---

## ✅ CREATE GATE

### Endpoint

```http
POST /api/gates/create
```

### Access

🔒 `security_chief`, `admin`

### Request Body

```json
{
  "name": "Main Gate",
  "description": "Primary entry gate",
  "location": "North Campus"
}
```

### Validation Rules

* `name`: 2–100 characters (required)
* `description`: 3–500 characters (required)
* `location`: 2–100 characters (required)

### Success Response (201)

```json
{
  "ok": true,
  "status": 201,
  "message": "Gate created successfully",
  "data": {
    "gate": {
      "id": "64fabc123",
      "name": "Main Gate",
      "description": "Primary entry gate",
      "location": "North Campus",
      "createdBy": {
        "id": "63faabc12",
        "fullName": "Security Chief"
      },
      "createdAt": "2025-12-25T08:00:00.000Z",
      "updatedAt": "2025-12-25T08:00:00.000Z"
    }
  }
}
```

---

## ✏️ UPDATE GATE

### Endpoint

```http
PATCH /api/gates/update/:id
```

### Access

🔒 `security_chief`, `admin`

### URL Params

| Param | Type             | Required |
| ----- | ---------------- | -------- |
| id    | MongoDB ObjectId | Yes      |

### Request Body (Any field optional)

```json
{
  "name": "Updated Gate Name",
  "location": "South Campus"
}
```

### Success Response (200)

```json
{
  "ok": true,
  "status": 200,
  "message": "Gate updated successfully",
  "data": {
    "gate": {
      "id": "64fabc123",
      "name": "Updated Gate Name",
      "description": "Primary entry gate",
      "location": "South Campus",
      "createdBy": {
        "id": "63faabc12",
        "fullName": "Security Chief"
      },
      "createdAt": "2025-12-25T08:00:00.000Z",
      "updatedAt": "2025-12-25T08:15:00.000Z"
    }
  }
}
```

---

## ❌ DELETE GATE

### Endpoint

```http
DELETE /api/gates/delete/:id
```

### Access

🔒 `security_chief`, `admin`

### URL Params

| Param | Type             |
| ----- | ---------------- |
| id    | MongoDB ObjectId |

### Success Response (200)

```json
{
  "ok": true,
  "status": 200,
  "message": "Gate deleted successfully"
}
```

---

## 🔍 GET SINGLE GATE

### Endpoint

```http
GET /api/gates/:id
```

### Access

🔓 Any authenticated user

### Success Response (200)

```json
{
  "ok": true,
  "status": 200,
  "message": "Gate fetched successfully",
  "data": {
    "gate": {
      "id": "64fabc123",
      "name": "Main Gate",
      "description": "Primary entry gate",
      "location": "North Campus",
      "createdBy": {
        "id": "63faabc12",
        "fullName": "Security Chief"
      },
      "createdAt": "2025-12-25T08:00:00.000Z",
      "updatedAt": "2025-12-25T08:00:00.000Z"
    }
  }
}
```

---

## 📄 GET ALL GATES (PAGINATED)

### Endpoint

```http
GET /api/gates
```

### Access

🔒 `security_chief`, `admin`

### Query Parameters (Optional)

| Param    | Description                  |
| -------- | ---------------------------- |
| page     | Page number (default: 1)     |
| limit    | Items per page (default: 10) |
| name     | Search by gate name          |
| location | Search by location           |

### Example

```http
GET /api/gates?page=1&limit=10&location=Campus
```

### Success Response (200)

```json
{
  "ok": true,
  "status": 200,
  "message": "Gates fetched successfully",
  "data": {
    "pagination": {
      "total": 3,
      "page": 1,
      "limit": 10,
      "totalPages": 1
    },
    "gates": [
      {
        "id": "64fabc123",
        "name": "Main Gate",
        "description": "Primary entry gate",
        "location": "North Campus",
        "createdBy": {
          "id": "63faabc12",
          "fullName": "Security Chief"
        },
        "createdAt": "2025-12-25T08:00:00.000Z",
        "updatedAt": "2025-12-25T08:00:00.000Z"
      }
    ]
  }
}
```

---

## ⚠️ Error Responses (Common)

### Validation Error (400)

```json
{
  "ok": false,
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "name": "\"name\" is required"
  }
}
```

### Not Found (404)

```json
{
  "ok": false,
  "status": 404,
  "message": "Gate not found"
}
```

### Unauthorized (401)

```json
{
  "ok": false,
  "status": 401,
  "message": "Unauthorized"
}
```