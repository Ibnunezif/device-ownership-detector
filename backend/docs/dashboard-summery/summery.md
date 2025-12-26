## Dashboard Summary

**Endpoint:**
`GET /api/movements/dashboard`

**Description:**
Fetches a summary of the system for the admin and security chief dashboards, including total counts of devices, users, gates, libraries, movements, and users by role.

**Access:**
Only accessible to users with roles `admin` or `security_chief`.

---

### Success Response (200)

```json
{
  "ok": true,
  "status": 200,
  "message": "Dashboard summary fetched successfully",
  "data": {
    "totalDevices": 6,
    "totalUsers": 7,
    "totalGates": 2,
    "totalLibraries": 1,
    "totalMovements": 2,
    "roles": {
      "students": 6,
      "staff": 0,
      "admins": 0,
      "securityChiefs": 1,
      "securityStaff": 0
    }
  }
}
```

---

### Notes

* The `roles` object shows the count of users for each role in the system.
* Counts include **all records in the database**.
* Endpoint is **restricted to admin and security_chief** users only.
