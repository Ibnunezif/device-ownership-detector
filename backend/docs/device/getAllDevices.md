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
example req endpoint
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
            "total": 5,
            "page": 1,
            "limit": 10,
            "totalPages": 1
        },
        "devices": [
            {
                "id": "694cfab226b60fa9eaf700e8",
                "brand": "sumsung",
                "model": "Galaxy S22",
                "serial_number": "SN-S26-2025-000901",
                "status": "pending",
                "barcode": "ugr/30030/14694a74e7dcba801d365afda8SN-S26-2025-000901",
                "device_photo": "https://res.cloudinary.com/dltagjsys/image/upload/v1766652592/user_uploads/yr2nbnbvr8dwk6fbftbi.jpg",
                "owner": {
                    "id": "694a74e7dcba801d365afda8",
                    "name": "Abdulhafiz Mohammed",
                    "email": "abdulhafiz.muhammed@astu.edu.et",
                    "department": "software engineering",
                    "university_id": "ugr/30030/14",
                    "image": null
                },
                "device_type": "Tablet",
                "createdAt": "2025-12-25T08:49:54.019Z"
            },
            {
                "id": "694cf9c1265138c10c23b654",
                "brand": "sumsung",
                "model": "Galaxy S22",
                "serial_number": "SN-S26-2025-000900",
                "status": "pending",
                "barcode": "ugr/30030/14SN-S26-2025-000900",
                "device_photo": "https://res.cloudinary.com/dltagjsys/image/upload/v1766652352/user_uploads/cbaiz9u9pb384x5a7gd9.jpg",
                "owner": {
                    "id": "694a74e7dcba801d365afda8",
                    "name": "Abdulhafiz Mohammed",
                    "email": "abdulhafiz.muhammed@astu.edu.et",
                    "department": "software engineering",
                    "university_id": "ugr/30030/14",
                    "image": null
                },
                "device_type": "Tablet",
                "createdAt": "2025-12-25T08:45:53.978Z"
            },
            {
                "id": "694cf709077376e0219467c3",
                "brand": "sumsung",
                "model": "Galaxy S22",
                "serial_number": "SN-S26-2025-00088",
                "status": "pending",
                "barcode": null,
                "device_photo": "https://res.cloudinary.com/dltagjsys/image/upload/v1766651656/user_uploads/zkxojvmass2ecwmshe81.jpg",
                "owner": {
                    "id": "694a74e7dcba801d365afda8",
                    "name": "Abdulhafiz Mohammed",
                    "email": "abdulhafiz.muhammed@astu.edu.et",
                    "department": "software engineering",
                    "university_id": "ugr/30030/14",
                    "image": null
                },
                "device_type": "Tablet",
                "createdAt": "2025-12-25T08:34:17.283Z"
            },
            {
                "id": "694b8e5d2783682beaef949d",
                "brand": "Samsung",
                "model": "Galaxy S23",
                "serial_number": "SN-S26-2025-0001",
                "status": "pending",
                "barcode": "SAMSUNG-S26-SN-S23-2025-0001",
                "device_photo": null,
                "owner": {
                    "id": "694a74e7dcba801d365afda8",
                    "name": "Abdulhafiz Mohammed",
                    "email": "abdulhafiz.muhammed@astu.edu.et",
                    "department": "software engineering",
                    "university_id": "ugr/30030/14",
                    "image": null
                },
                "device_type": "Laptop",
                "createdAt": "2025-12-24T06:55:25.663Z"
            },
            {
                "id": "694b8da12783682beaef9499",
                "brand": "Samsung",
                "model": "Galaxy S23",
                "serial_number": "SN-S23-2025-0001",
                "status": "pending",
                "barcode": "SAMSUNG-S23-SN-S23-2025-0001",
                "device_photo": null,
                "owner": {
                    "id": "694a74e7dcba801d365afda8",
                    "name": "Abdulhafiz Mohammed",
                    "email": "abdulhafiz.muhammed@astu.edu.et",
                    "department": "software engineering",
                    "university_id": "ugr/30030/14",
                    "image": null
                },
                "device_type": "Laptop",
                "createdAt": "2025-12-24T06:52:17.220Z"
            }
        ]
    }
}
```

---