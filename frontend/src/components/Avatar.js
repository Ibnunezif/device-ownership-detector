import React from "react";

const Avatar = ({image,name,onClick})=>{
    return (
    <div 
    className="profile-avatar"
    onClick={onClick} 
    >
        <img title={name} src={image} alt={`${name}'s avatar`} />
      </div>
    )
}

export { Avatar }