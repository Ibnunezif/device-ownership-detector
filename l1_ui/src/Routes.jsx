import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import DeviceRegistrationPortal from './pages/device-registration-portal';
import AuthenticationRoleSelection from './pages/authentication-role-selection';
import DeviceManagementConsole from './pages/device-management-console';
import RealTimeMonitoringDashboard from './pages/real-time-monitoring-dashboard';
import SecurityChiefApprovalQueue from './pages/security-chief-approval-queue';
import SecurityStaffScannerDashboard from './pages/security-staff-scanner-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AuthenticationRoleSelection />} />
        <Route path="/device-registration-portal" element={<DeviceRegistrationPortal />} />
        <Route path="/authentication-role-selection" element={<AuthenticationRoleSelection />} />
        <Route path="/device-management-console" element={<DeviceManagementConsole />} />
        <Route path="/real-time-monitoring-dashboard" element={<RealTimeMonitoringDashboard />} />
        <Route path="/security-chief-approval-queue" element={<SecurityChiefApprovalQueue />} />
        <Route path="/security-staff-scanner-dashboard" element={<SecurityStaffScannerDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
