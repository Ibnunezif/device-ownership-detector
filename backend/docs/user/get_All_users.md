
## 👥 Get All Users (Admin / Security Chief)

**Endpoint:**
`GET /api/user`

**Authorization:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Allowed Roles:**

* `admin`
* `security_chief`

---

### Query Parameters (Optional)

| Param      | Description          |
| ---------- | -------------------- |
| page       | Page number          |
| limit      | Results per page     |
| role       | Filter by role       |
| department | Filter by department |
| search     | Search by name/email |

---

### ✅ Success Response

```json
{
  "ok": true,
  "status": 200,
  "message": "Users fetched successfully",
  "data": {
    "pagination": {
      "total": 7,
      "page": 1,
      "limit": 10,
      "totalPages": 1
    },
    "users": [
      {
        "_id": "694cceeea4c22b01de51c9f3",
        "first_name": "Abdulbasit",
        "last_name": "Nezif",
        "profile_picture": "https://res.cloudinary.com/...",
        "phone_number": "+251917321099",
        "university_id": "ugr/300220/33",
        "department": "software",
        "batch": "2019",
        "role": "student",
        "email": "abd.nez@astu.edu.et",
        "createdAt": "2025-12-25T05:43:10.012Z",
        "updatedAt": "2025-12-25T05:43:10.012Z"
      }
    ]
  }
}
```

---

### ❌ Forbidden

```json
{
  "ok": false,
  "status": 403,
  "message": "Forbidden: Insufficient role"
}
```

---

---