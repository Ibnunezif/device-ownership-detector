
---

## 1️⃣ Update Device (with Optional File Upload)

**Endpoint:**
`PATCH /api/devices/update/:id`

**Description:**
Updates an existing device.
Supports updating device details and optionally replacing the device photo (Cloudinary image).

---

### Request Params

| Param | Type   | Required | Description       |
| ----- | ------ | -------- | ----------------- |
| id    | string | Yes      | MongoDB Device ID |

---

### Request Body (multipart/form-data)

| Field         | Type   | Required | Description                                      |
| ------------- | ------ | -------- | ------------------------------------------------ |
| brand         | string | No       | Device brand                                     |
| model         | string | No       | Device model                                     |
| serial_number | string | No       | Unique serial number                             |
| color         | string | No       | Device color                                     |
| barcode_data  | string | No       | Barcode information                              |
| device_photo  | file   | No       | New device image (replaces old Cloudinary image) |

---

### Example cURL

```bash
curl -X PATCH http://localhost:8080/api/devices/update/694ba0dcf102f68a6b075992 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "brand=Iphone" \
  -F "color=silk" \
  -F "device_photo=@/path/to/new-device-photo.png"
```

---

### Success Response (200)

```json
{
  "ok": true,
  "status": 200,
  "message": "Device updated successfully",
  "data": {
    "device": {
      "id": "694ba0dcf102f68a6b075992",
      "brand": "Iphone",
      "model": "Galaxy S22",
      "serial_number": "SN-S26-2025-0009",
      "color": "silk",
      "barcode_data": "SAMSUNG-S26-SN-S23-2025-0005",
      "status": "pending",
      "device_photo": "https://res.cloudinary.com/...png"
    },
    "owner": {
      "id": "694b9cc93e0d415927f22ecb"
    },
    "meta": {
      "updatedAt": "2025-12-24T11:07:16.650Z"
    }
  }
}
```

---

### Error Responses

**Validation failed**

```json
{
  "ok": false,
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "brand": "\"brand\" must be a string"
  }
}
```

**Device not found**

```json
{
  "ok": false,
  "status": 404,
  "message": "Device not found"
}
```

---