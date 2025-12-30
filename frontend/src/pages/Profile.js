import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Loading...
      </p>
    );
  }

  // Human-friendly date from ISO string
  const formattedDate = new Date(user.created_at).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="dashboard-container">
      <div className="profile-grid">
        {/* LEFT: Personal Info */}
        <div className="personal-info">
          <div className="avatar-section">
            <img
              src={user.profile_picture || "/default-avatar.png"}
              alt="Profile"
              className="avatar-img"
            />
          </div>

          <div className="card-info">
            <h3>
              {user.first_name} {user.last_name}
            </h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone_number}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Joined:</strong> {formattedDate}</p>
          </div>
        </div>

        {/* RIGHT: University + Edit */}
        <div className="right-column">
          <div className="university-info">
            <h3>University Information</h3>
            <p><strong>University ID:</strong> {user.university_id}</p>
            <p><strong>Department:</strong> {user.department}</p>
            <p><strong>Batch:</strong> {user.batch}</p>
          </div>

          <div className="edit-profile">
            <h3>Edit Profile</h3>
            <p>Update your personal and academic details.</p>
            <button
              className="edit-btn"
              onClick={() => navigate("/profile/edit")}
            >
              <AiOutlineEdit /> Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
