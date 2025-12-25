

---

# Get Device Data for PDF

**Endpoint:** `GET /api/devices/data-for-pdf/:id`
**Base URL:** `http://localhost:8080`

Fetch detailed information of a specific device including user info and device type to generate a PDF or barcode.

---

## URL Parameters

| Parameter | Type   | Required | Description                  |
| --------- | ------ | -------- | ---------------------------- |
| `id`      | string | Yes      | Device ID (MongoDB ObjectId) |

---

## Request Example

```http
GET /api/devices/data-for-pdf/694cf9c1265138c10c23b654 HTTP/1.1
Host: localhost:8080
Authorization: Bearer <your_token_here>
```

---

## Success Response

**Status Code:** `200 OK`
**Content-Type:** `application/json`

```json
{
  "ok": true,
  "status": 200,
  "message": "Devices fetched successfully",
  "data": {
    "name": "Abdulhafiz Mohammed",
    "university_id": "ugr/30030/14",
    "image_of_user": "",
    "device_type_name": "Tablet",
    "device_brand": "sumsung",
    "device_model": "Galaxy S22",
    "device_color": "silk",
    "device_serial_number": "SN-S26-2025-000900",
    "image_of_device": "https://res.cloudinary.com/dltagjsys/image/upload/v1766652352/user_uploads/cbaiz9u9pb384x5a7gd9.jpg",
    "barcode": "ugr/30030/14SN-S26-2025-000900"
  }
}
```

---

## Error Responses

### Invalid Device ID

**Status Code:** `400 Bad Request`

```json
{
  "ok": false,
  "status": 400,
  "message": "Invalid device ID"
}
```

### Device Not Found

**Status Code:** `404 Not Found`

```json
{
  "ok": false,
  "status": 404,
  "message": "Device not found"
}
```

### Server Error

**Status Code:** `500 Internal Server Error`

```json
{
  "ok": false,
  "status": 500,
  "message": "Something went wrong while fetching device data"
}
```

---

### Notes

* `image_of_user` will contain the Cloudinary URL of the user's profile picture if uploaded.
* `image_of_device` contains the Cloudinary URL of the device photo.
* `barcode` is a string combining the user's university ID and the device serial number with user system id.

---

