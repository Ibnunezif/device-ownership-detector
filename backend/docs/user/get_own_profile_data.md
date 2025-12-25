
# User Profile APIs

Base URL: `base-url/api/user`
Authentication: **Bearer Token required**

---

## 🔐 Get Logged-in User Profile (`/me`)

**Endpoint:**
`GET /api/user/me`

**Authorization:**

```
Authorization: Bearer <JWT_TOKEN>
```

---

### ✅ Success Response

```json
{
  "ok": true,
  "status": 200,
  "message": "User profile fetched",
  "data": {
    "user": {
      "_id": "694b9cc93e0d415927f22ecb",
      "first_name": "Security",
      "last_name": "Chief",
      "phone_number": "+251912345678",
      "university_id": "ugr/30026/19",
      "role": "security_chief",
      "email": "security.chief@astu.edu.et",
      "createdAt": "2025-12-24T07:56:57.124Z",
      "updatedAt": "2025-12-24T07:56:57.124Z"
    }
  }
}
```

---

### ❌ Error Response (Unauthorized)

```json
{
  "ok": false,
  "status": 401,
  "message": "Request is not authorized"
}
```

---
