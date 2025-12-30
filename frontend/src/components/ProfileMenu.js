import SidebarCard from "./SidebarCard";
import { Avatar } from "./Avatar";

import { LuLogOut } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";

import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from '../hooks/useLogout'
import { useProfile } from "../context/ProfileContext";

const ProfileMenu = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout()
  const {profileView} = useProfile()

  if (!profileView) return null;

  return (
    <div className="profile-menu">
      <div className="profile-card">
        {user && (
          <>
            <Avatar
              image={user.profile_picture}
              name={user.first_name + " " + user.last_name}
            />
            <div className="profile-content-card">
              <h2>
                {user.first_name + " " + user.last_name}
              </h2>
              <p>{user.role}</p>
            </div>
          </>
        )}
      </div>

      <div className="sidebar-content">
        <SidebarCard title="Profile" icon={<CgProfile />} path="/profile" />
        <SidebarCard title="Setting" icon={<IoSettingsOutline />} path="/setting" />
        <div className="error separater">
        <SidebarCard onClick = {()=>logout()} title="logout" icon={<LuLogOut />} />
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
