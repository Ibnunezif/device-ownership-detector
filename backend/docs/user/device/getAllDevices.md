## 2️⃣ Get All Devices (With Filters & Pagination)

**Endpoint:**
`GET /api/devices`

**Description:**
Fetches all registered devices with pagination, filtering, and search support.

---

### Query Parameters

| Parameter     | Type   | Required | Description                               |
| ------------- | ------ | -------- | ----------------------------------------- |
| page          | number | No       | Page number (default: 1)                  |
| limit         | number | No       | Items per page (default: 10)              |
| status        | string | No       | pending / approved / stolen / blocked     |
| brand         | string | No       | Filter by brand                           |
| model         | string | No       | Filter by model                           |
| serial_number | string | No       | Exact serial number                       |
| department    | string | No       | Filter by user department                 |
| search        | string | No       | Search across brand, model, serial number |

---

### Example Request

```http
GET /api/devices?page=1&limit=10&status=pending&search=Samsung
Authorization: Bearer YOUR_TOKEN
```

---

### Success Response (200)

```json
{
  "ok": true,
  "status": 200,
  "message": "Devices fetched successfully",
  "data": {
    "pagination": {
      "total": 25,
      "page": 1,
      "limit": 10,
      "totalPages": 3
    },
    "devices": [
      {
        "id": "694b9179a77a215e1b5ed8af",
        "brand": "Samsung",
        "model": "Galaxy S22",
        "serial_number": "SN-S26-2025-0005",
        "status": "pending",
        "device_photo": "https://res.cloudinary.com/...png",
        "owner": {
          "id": "694a74e7dcba801d365afda8",
          "name": "John Doe",
          "email": "john@example.com",
          "department": "Computer Science"
        },
        "device_type": "Smartphone",
        "createdAt": "2025-12-24T07:08:41.178Z"
      }
    ]
  }
}
```

---