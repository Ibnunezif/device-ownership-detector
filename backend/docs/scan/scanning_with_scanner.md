Got it 👍
Here is the **corrected Markdown**, with **`admin` explicitly NOT allowed**.

You can **replace only the Authentication section** in your document, or use the full corrected version below.

---

# 📡 Device Scan & Movement Logging API

This endpoint is used to **scan a device** at a gate (ENTRY or EXIT) using a barcode scanner, camera, or manual input.
Each scan is **validated, logged, and returned with full device, user, and gate details**.

---

## 🔐 Authentication & Authorization

**Required**

* Bearer Token (`Authorization: Bearer <token>`)

### ✅ Allowed Roles

* `security_worker`
* `security_chief`

### ❌ Not Allowed

* `admin`

> ⚠️ **Admins are not permitted to perform scanning operations.**
> Scanning is restricted to on-site security personnel only.

---

## 📍 Endpoint

```
POST /api/movements/scan
```

---

## 📦 Request Body

```json
{
  "barcode": "ugr/30030/14SN-S26-2025-000900",
  "gate_id": "694d948d01b7342d46a4f1f1",
  "scan_method": "BARCODE"
}
```

---

## 🧾 Request Fields

| Field       | Type   | Required | Description                            |
| ----------- | ------ | -------- | -------------------------------------- |
| barcode     | string | ✅ Yes    | Unique barcode attached to the device  |
| gate_id     | string | ✅ Yes    | ID of the gate where the scan occurred |
| scan_method | string | ✅ Yes    | How the scan was done                  |

### Allowed `scan_method` values

```
BARCODE | CAMERA | MANUAL
```

---

## ✅ Success Response

**Status:** `201 Created`

```json
{
  "ok": true,
  "status": 201,
  "message": "Scan logged successfully",
  "data": {
    "scan": {
      "movement_id": "694eb9d495729197d396c109",
      "movement_type": "EXIT",
      "scan_method": "BARCODE",
      "scanned_at": "2025-12-26T16:37:40.204Z"
    },
    "user": {
      "id": "694a74e7dcba801d365afda8",
      "full_name": "Abdulhafiz Mohammed",
      "university_id": "ugr/30030/14",
      "image": null
    },
    "device": {
      "id": "694cf9c1265138c10c23b654",
      "brand": "sumsung",
      "model": "Galaxy S22",
      "color": "silk",
      "serial_number": "SN-S26-2025-000900",
      "image": "https://res.cloudinary.com/dltagjsys/image/upload/v1766652352/user_uploads/cbaiz9u9pb384x5a7gd9.jpg"
    },
    "gate": {
      "id": "694d948d01b7342d46a4f1f1",
      "name": "Geda",
      "location": "South of the cumpus"
    }
  }
}
```

---

## ❌ Error Responses

### Forbidden – Role Not Allowed (`403`)

```json
{
  "ok": false,
  "status": 403,
  "message": "Access denied. Only security staff can scan devices."
}
```

---

### Validation Error – `400`

```json
{
  "ok": false,
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "scan_method": "\"scan_method\" must be one of [BARCODE, CAMERA, MANUAL]"
  }
}
```

---

### Device Not Found – `404`

```json
{
  "ok": false,
  "status": 404,
  "message": "Device not found"
}
```

---

## ⚡ Performance Notes

* Barcode field is indexed
* No heavy population during scan
* Optimized for **real-time scanning**
* Average response time: **< 2 seconds**

---

## 🔐 Security Design Note

Admins can:

* View scan logs
* Generate reports
* Audit movements

Admins **cannot**:

* Perform scans
* Log entry/exit events

This prevents misuse and preserves audit integrity.

---