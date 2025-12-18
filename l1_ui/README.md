# React

A modern React-based project utilizing the latest frontend technologies and tools for building responsive web applications.

## 🚀 Features

- **React 18** - React version with improved rendering and concurrent features
- **Vite** - Lightning-fast build tool and development server
- **Redux Toolkit** - State management with simplified Redux setup
- **TailwindCSS** - Utility-first CSS framework with extensive customization
- **React Router v6** - Declarative routing for React applications
- **Data Visualization** - Integrated D3.js and Recharts for powerful data visualization
- **Form Management** - React Hook Form for efficient form handling
- **Animation** - Framer Motion for smooth UI animations
- **Testing** - Jest and React Testing Library setup

## 📋 Prerequisites

- Node.js (v14.x or higher)
- npm or yarn

## 🛠️ Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
   
2. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## 📁 Project Structure

```
react_app/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── styles/         # Global styles and Tailwind configuration
│   ├── App.jsx         # Main application component
│   ├── Routes.jsx      # Application routes
│   └── index.jsx       # Application entry point
├── .env                # Environment variables
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.js      # Vite configuration
```

## 🧩 Adding Routes

To add new routes to the application, update the `Routes.jsx` file:

```jsx
import { useRoutes } from "react-router-dom";
import HomePage from "pages/HomePage";
import AboutPage from "pages/AboutPage";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <AboutPage /> },
    // Add more routes as needed
  ]);

  return element;
};
```

## 🎨 Styling

This project uses Tailwind CSS for styling. The configuration includes:

- Forms plugin for form styling
- Typography plugin for text styling
- Aspect ratio plugin for responsive elements
- Container queries for component-specific responsive design
- Fluid typography for responsive text
- Animation utilities

## 📱 Responsive Design

The app is built with responsive design using Tailwind CSS breakpoints.


## 📦 Deployment

Build the application for production:

```bash
npm run build
```


?

(opens in new tab)
2. Departments Table
sql

users
├── user_id (Primary Key)
├── username
├── email
├── password_hash
├── role (student/security_staff/security_chief/admin)
├── first_name
├── last_name
├── department_id (Foreign Key)
├── employee_id / student_id
├── phone_number
├── is_active
├── two_factor_enabled
├── last_login_timestamp
├── failed_login_attempts
├── account_locked_until
├── created_at
├── updated_at
└── profile_photo_path
(opens in new tab)
2. Departments Table
sql


departments
├── department_id (Primary Key)
├── department_name
├── department_code
├── building_location
├── head_of_department
├── contact_email
├── is_active
├── created_at
└── updated_at
(opens in new tab)
3. Devices Table
sql


devices
├── device_id (Primary Key)
├── owner_user_id (Foreign Key)
├── device_type (laptop/tablet/phone/desktop)
├── brand
├── model
├── serial_number (Unique)
├── color
├── device_description
├── purchase_date
├── warranty_info
├── estimated_value
├── device_photo_path
├── device_condition
├── is_registered
├── is_active
├── risk_score (Smart Feature)
├── theft_probability (Smart Feature)
├── last_seen_location
├── last_seen_timestamp
├── created_at
└── updated_at
(opens in new tab)
4. Device_Registrations Table
sql


device_registrations
├── registration_id (Primary Key)
├── device_id (Foreign Key)
├── user_id (Foreign Key)
├── registration_status (pending/approved/rejected/expired)
├── submitted_at
├── reviewed_by (Foreign Key to users)
├── reviewed_at
├── approval_notes
├── rejection_reason
├── expiry_date
├── auto_approval_score (Smart Feature)
├── registration_priority (Smart Feature)
├── verification_documents
├── created_at
└── updated_at
(opens in new tab)
5. Barcodes Table
sql


barcodes
├── barcode_id (Primary Key)
├── device_id (Foreign Key)
├── barcode_data (PDF417 encoded)
├── barcode_hash (Unique)
├── encryption_key
├── generation_method
├── barcode_image_path
├── is_active
├── generated_by (Foreign Key to users)
├── generated_at
├── expires_at
├── scan_count
├── last_scanned_at
├── created_at
└── updated_at
(opens in new tab)
6. ID_Cards Table
sql


id_cards
├── card_id (Primary Key)
├── device_id (Foreign Key)
├── user_id (Foreign Key)
├── barcode_id (Foreign Key)
├── card_number (Unique)
├── card_pdf_path
├── card_status (active/lost/stolen/expired)
├── issued_by (Foreign Key to users)
├── issued_at
├── expires_at
├── print_count
├── last_printed_at
├── replacement_reason
├── parent_card_id (For replacements)
├── created_at
└── updated_at
(opens in new tab)
7. Locations Table
sql


locations
├── location_id (Primary Key)
├── location_name
├── location_type (gate/building/room/checkpoint)
├── building_name
├── floor_number
├── scanner_device_id
├── coordinates_lat
├── coordinates_lng
├── is_entry_point
├── is_exit_point
├── operating_hours_start
├── operating_hours_end
├── is_active
├── created_at
└── updated_at
(opens in new tab)
8. Movement_Logs Table
(Smart Tracking)
sql


movement_logs
├── log_id (Primary Key)
├── device_id (Foreign Key)
├── user_id (Foreign Key)
├── location_id (Foreign Key)
├── scanner_user_id (Foreign Key to users)
├── movement_type (entry/exit/verification)
├── scan_method (barcode_scanner/phone_camera/manual_search)
├── scan_timestamp
├── verification_status (verified/failed/suspicious)
├── scan_duration_ms
├── confidence_score (Smart Feature)
├── anomaly_detected (Smart Feature)
├── risk_level (low/medium/high)
├── additional_notes
├── ip_address
├── user_agent
├── gps_coordinates
├── created_at
└── updated_at
(opens in new tab)
9. Alerts Table
(Smart Notifications)
sql


alerts
├── alert_id (Primary Key)
├── device_id (Foreign Key)
├── user_id (Foreign Key)

(opens in new tab)
10. Security_Events Table
(Smart Analytics)
sql


security_events
├── event_id (Primary Key)
├── event_type (failed_scan/multiple_attempts/time_anomaly/location_anomaly)
├── device_id (Foreign Key)

(opens in new tab)
Smart Features Enhancement Tables
(opens in new tab)
11. Device_Analytics Table
(ML/AI Ready)
sql


device_analytics
├── analytics_id (Primary Key)
├── device_id (Foreign Key)
├── daily_scan_count

(opens in new tab)
12. System_Performance Table
(Performance Tracking)
sql


system_performance
├── performance_id (Primary Key)
├── location_id (Foreign Key)
├── scanner_user_id (Foreign Key)
├── date_recorded
├── total_scans
├── successful_scans
├── failed_scans
├── average_scan_time_ms
├── peak_hour_performance
├── system_uptime_percentage
├── error_rate_percentage
├── throughput_per_hour
├── created_at
└── updated_at
(opens in new tab)
13. Audit_Trail Table
(Non-editable Logs)
sql


audit_trail
├── audit_id (Primary Key)
├── table_name
├── record_id
├── action_type (insert/update/delete/view)
├── old_values (JSON)
├── new_values (JSON)
├── changed_by (Foreign Key to users)
├── change_timestamp
├── ip_address
├── user_agent
├── change_reason
├── is_system_generated
└── created_at (Immutable)      lets analyse