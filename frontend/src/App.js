import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProfileMenu from './components/ProfileMenu';
import ProtectedRoute from './components/ProtectedRoute';
import Notification from './components/Notification';


// contexts
import { useProfile } from './context/ProfileContext';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import User from './pages/User';
import Setting from './pages/Setting';
import Profile from './pages/Profile';
import Registration from './pages/Registration';
import Device from './pages/Devices';
import DeviceType from './pages/DeviceType';
import Scan from './pages/Scan';
import Gate from './pages/Gate';
import ManualSearch from './pages/ManualSearch';
import Role from './pages/Role';
import Library from './pages/Libarary'


function App() {
  const { user } = useAuthContext();
  const { profileView, setProfileView } = useProfile();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="layout" onClick={() => { if (profileView) setProfileView(false); }}>
          {user && <Sidebar />}
          <Notification/>
          <ProfileMenu />
          <div className="pages">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/register" element={!user ? <Registration /> : <Navigate to="/" />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/dashboard" element={<ProtectedRoute ><Dashboard /></ProtectedRoute>} />
              <Route path="/users" element={<ProtectedRoute roles={["admin","security_chief"]}><User /></ProtectedRoute>} />
              <Route path="/devices" element={<ProtectedRoute roles={["security_chief"]}><Device /></ProtectedRoute>} />
              <Route path="/device-types" element={<ProtectedRoute roles={["admin","security_chief"]}><DeviceType /></ProtectedRoute>} />
              <Route path="/scan" element={<ProtectedRoute roles={["security_staff","security_chief"]}><Scan /></ProtectedRoute>} />
              <Route path="/gate" element={<ProtectedRoute roles={["admin","security_chief"]} ><Gate /></ProtectedRoute>} />
              <Route path="/roles" element={<ProtectedRoute roles={["admin"]}><Role /></ProtectedRoute>} />
              <Route path="/library" element={<ProtectedRoute roles={["admin"]}><Library /></ProtectedRoute>} />
              <Route path="/manual-search" element={<ProtectedRoute roles={["security_staff","security_chief"]}><ManualSearch /></ProtectedRoute>} />
              <Route path="/setting" element={<ProtectedRoute><Setting /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
