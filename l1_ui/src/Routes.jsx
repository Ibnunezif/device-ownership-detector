import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import AddDevice from './pages/add-device';
import SecurityScan from './pages/security-scan';
import Login from './pages/login';
import StudentDashboard from './pages/student-dashboard';
import Register from './pages/register';


import AdminDashboard from './pages/admin-dashboard';
import LogsPage from './pages/logs';
import DeviceDetail from './pages/device-detail';
import DeviceDetailIndividual from './pages/device-detail-individual';
import UnauthorizedAccess from './pages/unauthorized-access';
import StolenDevicesPage from './pages/stolen-devices';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Login />} />
        <Route path="/add-device" element={<AddDevice />} />
        <Route path="/security-scan" element={<SecurityScan />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/register" element={<Register />} />
       


         <Route path="/" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/logs" element={<LogsPage />} />
        <Route path="/device-detail" element={<DeviceDetail />} />
        <Route path="/device-detail-individual" element={<DeviceDetailIndividual />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized-access" element={<UnauthorizedAccess />} />
        <Route path="/stolen-devices" element={<StolenDevicesPage />} />
        <Route path="*" element={<NotFound />} />

      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
