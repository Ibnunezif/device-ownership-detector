# Device Registration API (with File Upload)

**Endpoint:** `POST /api/devices/register`  
**Base URL:** `http://localhost:8080`

---

## Request Body (multipart/form-data)

Use `multipart/form-data` to upload the device photo.

| Field           | Type     | Required | Description                                         |
|-----------------|---------|----------|-----------------------------------------------------|
| user_id         | string  | Yes      | The ID of the user who owns the device             |
| device_type_id  | string  | Yes      | The ID of the device type                           |
| device_photo    | file    | Yes      | Image file of the device to upload to Cloudinary   |
| brand           | string  | Yes      | Device brand (e.g., Samsung)                       |
| model           | string  | Yes      | Device model (e.g., Galaxy S23)                    |
| serial_number   | string  | Yes      | Unique device serial number                         |
| color           | string  | No       | Device color                                       |
| barcode_data    | string  | No       | Barcode information for the device                 |

**Example using cURL:**

```bash
curl -X POST http://localhost:8080/api/devices/register \
  -F "user_id=694a74e7dcba801d365afda8" \
  -F "device_type_id=65d0f1b2a9e3c1d4f8a9b128" \
  -F "brand=Samsung" \
  -F "model=Galaxy S23" \
  -F "serial_number=SN-S26-2025-0001" \
  -F "color=Black" \
  -F "barcode_data=SAMSUNG-S26-SN-S23-2025-0001" \
  -F "device_photo=@/path/to/device-photo.png"
```
  **Output:**

```json
{
  "ok": true,
  "status": 201,
  "message": "Device registered successfully",
  "data": {
    "device": {
      "id": "694b9179a77a215e1b5ed8af",
      "brand": "Samsung",
      "model": "Galaxy S22",
      "serial_number": "SN-S26-2025-0005",
      "status": "pending",
      "device_photo": "https://res.cloudinary.com/dltagjsys/image/upload/v1766560121/user_uploads/uraoxhjgbywyxtf2cq0x.png"
    },
    "owner": {
      "id": "694a74e7dcba801d365afda8"
    },
    "meta": {
      "createdAt": "2025-12-24T07:08:41.178Z"
    }
  }
}
```

**Error response 1:**
```json
{
  "ok": false,
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "user_id": "\"user_id\" is required",
    "device_type_id": "\"device_type_id\" is required",
    "brand": "\"brand\" is required",
    "model": "\"model\" is required",
    "serial_number": "\"serial_number\" is required",
    "device_photo": "\"device_photo\" is required"
  }
}
```

**Error response 2:**
```json
{
  "ok": false,
  "status": 400,
  "message": "Device already registered"
}
```