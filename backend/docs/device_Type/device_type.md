

# Device Type API

**Base URL:** `http://localhost:8080/api/device-types`

---

## Create Device Type

**Endpoint:** `POST /create`
**Access:** `security_chief`, `admin`
**Middleware:** `requireAuth`, `requireRole("security_chief","admin")`

### Request Body

**Content-Type:** `application/json`

| Field       | Type   | Required | Description                    |
| ----------- | ------ | -------- | ------------------------------ |
| name        | string | Yes      | Name of the device type        |
| description | string | No       | Description of the device type |

**Example Request:**

```json
{
  "name": "Laptop",
  "description": "Portable personal computers"
}
```

**Success Response:**

```json
{
  "ok": true,
  "status": 201,
  "message": "Device type created successfully",
  "data": {
    "deviceType": {
      "id": "694ce9256d0a22d19268bee1",
      "name": "Laptop",
      "description": "Portable personal computers",
      "createdBy": {
        "id": "694b9cc93e0d415927f22ecb",
        "fullName": "Security Chief"
      },
      "createdAt": "2025-12-25T07:35:01.164Z",
      "updatedAt": "2025-12-25T07:35:01.164Z"
    }
  }
}
```

---

## Update Device Type

**Endpoint:** `PATCH /update/:id`
**Access:** `security_chief`, `admin`
**Middleware:** `requireAuth`, `requireRole("security_chief","admin")`

### Request Body

**Content-Type:** `application/json`

| Field       | Type   | Required | Description                     |
| ----------- | ------ | -------- | ------------------------------- |
| name        | string | No       | Updated name of the device type |
| description | string | No       | Updated description             |

**Example Request:**

```json
{
  "name": "PC Laptop"
}
```

**Success Response:**

```json
{
  "ok": true,
  "status": 200,
  "message": "Device type updated successfully",
  "data": {
    "deviceType": {
      "id": "694ce9256d0a22d19268bee1",
      "name": "PC Laptop",
      "description": "Portable personal computers",
      "createdBy": {
        "id": "694b9cc93e0d415927f22ecb",
        "fullName": "Security Chief"
      },
      "createdAt": "2025-12-25T07:35:01.164Z",
      "updatedAt": "2025-12-25T07:39:58.637Z"
    }
  }
}
```

---

## Delete Device Type

**Endpoint:** `DELETE /delete/:id`
**Access:** `security_chief`, `admin`
**Middleware:** `requireAuth`, `requireRole("security_chief","admin")`

**Success Response:**

```json
{
  "ok": true,
  "status": 200,
  "message": "Device type deleted successfully"
}
```

**Error Response (if devices are associated):**

```json
{
  "ok": false,
  "status": 400,
  "message": "Cannot delete device type. One or more devices are associated with it."
}
```

---

## Get Single Device Type

**Endpoint:** `GET /:id`
**Access:** Authenticated users
**Middleware:** `requireAuth`

**Success Response:**

```json
{
  "ok": true,
  "status": 200,
  "message": "Device type fetched successfully",
  "data": {
    "deviceType": {
      "id": "694ce9256d0a22d19268bee1",
      "name": "Laptop",
      "description": "Portable personal computers",
      "createdBy": {
        "id": "694b9cc93e0d415927f22ecb",
        "fullName": "Security Chief"
      },
      "createdAt": "2025-12-25T07:35:01.164Z",
      "updatedAt": "2025-12-25T07:35:01.164Z"
    }
  }
}
```

---

## Get All Device Types (Paginated)

**Endpoint:** `GET /`
**Access:** `security_chief`, `admin`
**Middleware:** `requireAuth`, `requireRole("security_chief","admin")`

### Query Parameters

| Parameter | Type   | Required | Description                 |
| --------- | ------ | -------- | --------------------------- |
| page      | number | No       | Page number (default 1)     |
| limit     | number | No       | Items per page (default 10) |
| name      | string | No       | Filter by device type name  |

**Success Response:**

```json
{
  "ok": true,
  "status": 200,
  "message": "Device types fetched successfully",
  "data": {
    "pagination": {
      "total": 1,
      "page": 1,
      "limit": 10,
      "totalPages": 1
    },
    "deviceTypes": [
      {
        "id": "694ce9256d0a22d19268bee1",
        "name": "Laptop",
        "description": "Portable personal computers",
        "createdBy": {
          "id": "694b9cc93e0d415927f22ecb",
          "fullName": "Security Chief"
        },
        "createdAt": "2025-12-25T07:35:01.164Z",
        "updatedAt": "2025-12-25T07:35:01.164Z"
      }
    ]
  }
}
```

---