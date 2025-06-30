import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ServicesPage from "./pages/admin/ServicesPage";

import Dashboard from "./pages/admin/Dashboard";
import PatientsPage from "./pages/admin/PatientsPage";
import IncidentsPage from "./pages/admin/IncidentsPage";
import CalendarPage from "./pages/admin/CalendarPage";
import PatientView from "./pages/patient/PatientView";

import ProtectedRoute from "./components/ProtectedRoute";
import LayoutWithNavbar from "./layout/LayoutWithNavbar"; 

export default function App() {
  return (
    <Routes>
      
      <Route path="/" element={<LandingPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/login/:role" element={<LoginPage />} />

     
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="Admin">
            <LayoutWithNavbar>
              <Dashboard />
            </LayoutWithNavbar>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/patients"
        element={
          <ProtectedRoute role="Admin">
            <LayoutWithNavbar>
              <PatientsPage />
            </LayoutWithNavbar>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/incidents"
        element={
          <ProtectedRoute role="Admin">
            <LayoutWithNavbar>
              <IncidentsPage />
            </LayoutWithNavbar>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/calendar"
        element={
          <ProtectedRoute role="Admin">
            <LayoutWithNavbar>
              <CalendarPage />
            </LayoutWithNavbar>
          </ProtectedRoute>
        }
      />

      
      <Route
        path="/me"
        element={
          <ProtectedRoute role="Patient">
            <LayoutWithNavbar>
              <PatientView />
            </LayoutWithNavbar>
          </ProtectedRoute>
        }
      />

      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
