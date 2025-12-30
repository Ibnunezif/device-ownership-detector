import React from "react";
import { useNavigate } from "react-router-dom";

const SidebarCard = ({ icon, title, path, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick(); // optional extra method
    if (path) navigate(path); // navigate only if path is provided
  };

  return (
    <div className="sidebar-card" title={title} onClick={handleClick}>
      <div className="sidebar-card-icon">{icon}</div>
      <span className="sidebar-card-title">{title}</span>
    </div>
  );
};

export default SidebarCard;
