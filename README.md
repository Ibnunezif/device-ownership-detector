


# Smart PC Owner
**Device Ownership Verification & Anti-Theft System (MERN Stack)**

---

## 📌 Project Description
Smart PC Owner is a MERN-stack–based web application designed to verify personal computer ownership and prevent device theft within university campuses. The system allows students to register their devices, generates secure PDF417 barcodes and ID cards, and enables security personnel to verify devices at checkpoints. All device movements are logged for monitoring and reporting purposes.

---

## 🚀 Features
- Student device registration with photo upload
- Secure PDF417 barcode generation
- Printable device ID cards
- Device verification at security checkpoints
- Entry and exit movement logging
- Incident reporting and alerts
- Role-Based Access Control (RBAC)
- Admin dashboard with reports and analytics

---

## 🧑‍🤝‍🧑 User Roles
- **Student** – Register and manage personal devices
- **Security Staff** – Verify devices and report incidents
- **Security Supervisor** – Monitor checkpoints and generate reports
- **Administrator** – Full system management and analytics

---

## 🏗️ System Architecture (MERN)
- **Frontend:** React.js
- **Backend:** Node.js with Express.js
- **Database:** MongoDB
- **Authentication:** JWT-based authentication
- **Barcode Technology:** PDF417
- **Deployment:** Local or cloud-based (e.g., Render, Vercel, MongoDB Atlas)

---

## ⚙️ Setup Instructions

### 1️⃣ Prerequisites
Make sure the following are installed:
- Node.js (v16 or later)
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Git
- Modern web browser (Chrome / Firefox)

---

### 2️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/smart-pc-owner.git
cd smart-pc-owner
````

---

### 3️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
# Server configuration
SERVER_PORT=8080

# MongoDB connection (replace with your own credentials)
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>

# Application secret key
SECRET=your_secret_key_here

# Cloudinary configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Start the backend server:

```bash
npm run dev
```

---

### 4️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend will run at:

```
http://localhost:8080
```

---

## ▶️ Usage Instructions

### Student

1. Register and log in
2. Register up to three personal devices
3. Upload required photos
4. Download or print the device ID card
5. View device movement history

### Security Staff

1. Log in to the security interface
2. Scan PDF417 barcode or search manually
3. Verify device ownership and status
4. Log entry or exit movements
5. Report incidents if necessary

### Administrator / Supervisor

1. Approve device registrations
2. Manage users and roles
3. Monitor logs and incidents
4. Generate reports and analytics

---

## 📦 Dependencies

### Backend Dependencies

* Node.js
* Express.js
* MongoDB & Mongoose
* JSON Web Token (JWT)
* bcrypt
* PDF417 barcode library
* dotenv
* Multer (file uploads)

### Frontend Dependencies

* React.js
* React Router
* Axios
* HTML, CSS, JavaScript

### Optional Hardware

* PDF417 barcode scanner
* Webcam or mobile camera for scanning

---

## 🔐 Security Features

* Encrypted barcode payloads
* Hashed user credentials
* JWT-based authentication
* Role-Based Access Control (RBAC)
* Audit logs for all critical operations

---

## 📊 Documentation

* Problem Analysis Document (PAD)
* Software Requirements Specification (SRS)
* UML and ER Diagrams
* Gantt Chart and Timeline

---

## 🤝 Contributors

* Project Manager: *Abdulbasit Nezif*
* Backend Developer: *Salahaddin Kadi,Hussein Beshir,Abdulbasit Nezif*
* Frontend Developer: *Lelisa Waktola*
* Security & Testing Lead: *Fahami Jemal,Abdulhafiz Mohammed*
* Documentation: *Fahami Jemal,Abdulhafiz Mohammed,Nahom Sisay*

---

## 📜 License

This project is developed for academic purposes only.
All rights reserved © 2024–2025.

---

## 📬 Contact

For questions or collaboration, please contact the project supervisor or team members.


