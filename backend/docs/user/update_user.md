
## ✏️ Update User Profile

**Endpoint:**
`PATCH /api/user/update/:id`

**Authorization:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Access:**
Only users with role:

* `security_chief`

---

### Request Body

**Content-Type:** `multipart/form-data`

| Field           | Type   | Required | Description        |
| --------------- | ------ | -------- | ------------------ |
| first_name      | string | No       | Updated first name |
| last_name       | string | No       | Updated last name  |
| phone_number    | string | No       | Phone number       |
| university_id   | string | No       | University ID      |
| department      | string | No       | Department         |
| batch           | string | No       | Batch/year         |
| role            | string | No       | User role          |
| email           | string | No       | ASTU email         |
| profile_picture | file   | No       | Profile image      |

> ⚠️ At least **one field must be provided**

---

### ✅ Success Response

```json
{
  "ok": true,
  "status": 200,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "_id": "694b9cc93e0d415927f22ecb",
      "first_name": "Security",
      "last_name": "Chief",
      "phone_number": "+251912345678",
      "university_id": "ugr/30026/19",
      "role": "security_chief",
      "email": "security.chief@astu.edu.et",
      "profile_picture": "https://res.cloudinary.com/...",
      "createdAt": "2025-12-24T07:56:57.124Z",
      "updatedAt": "2025-12-25T06:31:08.530Z"
    }
  }
}
```

---

### ❌ Validation Error

```json
{
  "ok": false,
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "": "At least one field must be updated"
  }
}
```

---

