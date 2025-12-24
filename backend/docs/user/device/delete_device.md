## 3️⃣ Delete Device
**Endpoint:**
`DELETE /api/devices/:id`

**Description:**
Deletes a device permanently and removes its image from Cloudinary.

---

### Request Params

| Param | Type   | Required | Description       |
| ----- | ------ | -------- | ----------------- |
| id    | string | Yes      | MongoDB Device ID |

---

### Example cURL

```bash
curl -X DELETE http://localhost:8080/api/devices/694b9179a77a215e1b5ed8af \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### Success Response (200)

```json
{
  "ok": true,
  "status": 200,
  "message": "Device deleted successfully"
}
```

---

### Error Response

```json
{
  "ok": false,
  "status": 404,
  "message": "Device not found"
}
```

---

## ✅ Notes

* All image uploads use **Cloudinary**
* Old images are **automatically deleted** on update
* All endpoints require authentication
* Validation handled via **Joi**

---
