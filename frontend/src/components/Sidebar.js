import { useState } from "react";
import { MdKeyboardDoubleArrowRight, MdOutlineDashboard, MdDevicesOther, MdOutlineScreenSearchDesktop } from "react-icons/md";
import { IoLibraryOutline } from "react-icons/io5";
import { GiSaloonDoors } from "react-icons/gi";
import { FaUsers, FaUserShield } from "react-icons/fa";
import { PiDevicesLight } from "react-icons/pi";
import { LuScanBarcode } from "react-icons/lu";

import SidebarCard from "./SidebarCard";
import { useAuthContext } from "../hooks/useAuthContext";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuthContext();

  // Sidebar items with role restrictions
  const sidebarItems = [
    { icon: <MdOutlineDashboard />, title: "Dashboard", path: "dashboard", roles: null }, // all logged-in users
    { icon: <FaUsers />, title: "User", path: "users", roles: ["admin","security_chief"] },
    { icon: <IoLibraryOutline />, title: "Library", path: "library", roles: ["admin"] },
    { icon: <GiSaloonDoors />, title: "Gates", path: "gate", roles: ["admin","security_chief"] },
    { icon: <MdDevicesOther />, title: "Devices", path: "devices", roles: ["security_chief"] },
    { icon: <PiDevicesLight />, title: "Device Types", path: "device-types", roles: ["admin","security_chief"] },
    { icon: <LuScanBarcode />, title: "Scan", path: "scan", roles: ["security_staff","security_chief"] },
    { icon: <MdOutlineScreenSearchDesktop />, title: "Device Search", path: "manual-search", roles: ["security_staff","security_chief"] },
    { icon: <FaUserShield />, title: "Role", path: "roles", roles: ["admin"] },
  ];

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <img
        className={`sidebar-logo ${collapsed ? "disappear" : ""}`}
        src="/astu-logo.webp"
        alt="ASTU Logo"
      />
      <aside>
        <MdKeyboardDoubleArrowRight
          className={collapsed ? "sidebar-icon" : "sidebar-icon sidebar-icon-rotate"}
          size={30}
          color="var(--primary)"
          onClick={() => setCollapsed(!collapsed)}
        />

        <div className={`sidebar-content ${collapsed ? "shaw-all-content" : ""}`}>
          {sidebarItems.map((item) => {
            // Show item if no roles specified OR user role matches
            if (!item.roles || item.roles.includes(user.role)) {
              return (
                <SidebarCard
                  key={item.path}
                  icon={item.icon}
                  title={item.title}
                  path={item.path}
                />
              );
            }
            return null;
          })}
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
