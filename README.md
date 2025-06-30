# 🦷 ENTNT Dental Clinic Management System

A modern, responsive dental clinic management system built using **React**, **Tailwind CSS**, and **React Router**. The system includes role-based access for **Admin** and **Patient**, local storage-based data simulation, appointment handling, and a sleek dashboard UI.

## 🚀 Live Demo
[Visit the live site (Vercel)] 
(https://dental-management-system-three.vercel.app/)
(https://dentalclinicentnt.netlify.app/) 


---

## 🔐 Login Credentials

Use the following mock credentials to log in:

### 👨‍⚕️ Admin Login
- **Email:** `admin@entnt.com`  
- **Password:** `admin123`

### 🧑‍💼 Patient Login
- **Email:** `patient@entnt.com`  
- **Password:** `patient123`

---

## 📂 Features

### 🔐 Authentication
- Role-based login system (Admin / Patient)
- Mock login interface using `Context API`

### 👨‍⚕️ Admin Dashboard
- View and manage **patients**
- Add, update, or delete **incident reports** (appointments)
- Calendar for tracking appointments
- File upload support (e.g., bills, prescriptions)
- Responsive sidebar navigation

### 🧑‍💼 Patient View
- View their incident history
- Access treatment files, upcoming appointments

### 📅 Appointment Booking (Landing Page)
- Responsive and interactive appointment form
- Service selection & Google Maps integration

---

## 🛠️ Tech Stack

| Technology        | Usage                     |
|-------------------|---------------------------|
| React             | Frontend Framework        |
| Tailwind CSS      | Styling & Responsiveness  |
| React Router DOM  | Routing                   |
| Context API       | Auth & Data Management    |
| LocalStorage      | Data Persistence (Mock DB)|
| Vercel            | Deployment                |

---
## 🏗️ Project Architecture

📦 src
 ┣ 📂assets            # Static images/icons
 ┣ 📂components
 ┃ ┣ 📂admin           # Admin-specific UI components (modals, tables)
 ┃ ┣ 📂auth            # Login form
 ┃ ┣ 📂common          # Reusable components (e.g., KPIWidget, FileUploader)
 ┃ ┗ 📜Navbar.jsx      # Top navigation bar
 ┣ 📂context           # Context API for global state management
 ┣ 📂data              # Mock patient and incident data
 ┣ 📂hooks             # Custom hooks (e.g., useLocalStorage)
 ┣ 📂layout            # Layout component with navbar
 ┣ 📂pages
 ┃ ┣ 📂admin           # Admin pages (Dashboard, Patients, Incidents)
 ┃ ┣ 📂patient         # Patient profile page
 ┃ ┗ 📜LandingPage.jsx # Marketing landing page
 ┣ 📂services          # Storage layer for CRUD on localStorage
 ┣ 📂styles            # Tailwind CSS files
 ┣ 📂utils             # Helper functions and constants
 ┣ 📜App.jsx           # Root application
 ┗ 📜main.jsx          # Entry point

## ⚠️ Known Issues

❌ No actual backend/API (data is reset on localStorage clear)

📆 Calendar currently displays events but has limited interaction

🖼️ File preview limited to basic rendering — no advanced validation

🚫 No role protection on route level (basic implementation only)


## 🧩 Technical Decisions

✅ localStorage over mock server to reduce backend dependencies and simplify testing.

🧠 Context API chosen for light state needs instead of Redux.

🛠️ Used Framer Motion for card animation on Services section.

🌐 All icons from Heroicons, ensuring clean design.

⚡ Switched from image import to public/ folder for static assets after Vercel deployment issues.



## 🧪 Usage Instructions

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build

📝 Author
👩‍💻 Bhumi Zalte

📫 Feel free to connect or contribute!



