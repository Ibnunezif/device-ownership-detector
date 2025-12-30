import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRegister } from "../hooks/useRegistration";

const Registration = () => {
  const navigate = useNavigate();
  const { register, isLoading, error } = useRegister();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    university_id: "",
    department: "",
    batch: "",
    email: "",
    password: "",
    profile_picture: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState(null);

  // Handle input and file changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile_picture" && files[0]) {
      const file = files[0];
      setFormData({ ...formData, profile_picture: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData({ ...formData, profile_picture: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await register(formData);

    // On success, navigate to dashboard
    if (result?.user) {
      navigate("/");
    }
  };

  return (
    <form className="registration-form flat" onSubmit={handleSubmit}>
  <h3>REGISTER ACCOUNT</h3>

  <div
    className="profile-picture drop-zone"
    onDrop={handleDrop}
    onDragOver={handleDragOver}
  >
    {preview ? (
      <img src={preview} alt="Profile Preview" className="sidebar-logo" />
    ) : (
      <>
      <p>Drag & drop your profile picture here or click to select</p>
      <p> {"< 5MB"}</p>
      <p>only jpg, png and jpeg formats are allowed</p>
      </>
    )}
    <input
      type="file"
      name="profile_picture"
      accept="image/*"
      onChange={handleChange}
    />
  </div>
  {error?.profile_picture && (
      <div className="error">{error.profile_picture}</div>
    )}

  <div className="form-grid">
    <div className="input-container">
      <input
        type="text"
        placeholder="First Name"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
      />
      {error?.first_name && <div className="error">{error.first_name}</div>}
    </div>

    <div className="input-container">
      <input
        type="text"
        placeholder="Last Name"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
      />
      {error?.last_name && <div className="error">{error.last_name}</div>}
    </div>
  </div>

  <div className="form-grid">
    <div className="input-container">
      <input
        type="text"
        placeholder="University ID"
        name="university_id"
        value={formData.university_id}
        onChange={handleChange}
      />
      {error?.university_id && <div className="error">{error.university_id}</div>}
    </div>

    <div className="input-container">
      <input
        type="text"
        placeholder="Department"
        name="department"
        value={formData.department}
        onChange={handleChange}
      />
      {error?.department && <div className="error">{error.department}</div>}
    </div>
  </div>

  <div className="form-grid">
    <div className="input-container">
      <input
        type="text"
        placeholder="Batch"
        name="batch"
        value={formData.batch}
        onChange={handleChange}
      />
      {error?.batch && <div className="error">{error.batch}</div>}
    </div>

    <div className="input-container">
      <input
        type="tel"
        placeholder="Phone Number"
        name="phone_number"
        value={formData.phone_number}
        onChange={handleChange}
        
      />
      {error?.phone_number && <div className="error">{error.phone_number}</div>}
    </div>
  </div>

  <div className="input-container">
    <input
      type="email"
      placeholder="Email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      
    />
    {error?.email && <div className="error">{error.email}</div>}
  </div>

  <div className="password-group input-container">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      
    />
    <span
      className="toggle-password"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
    </span>
    {error?.password && <div className="error">{error.password}</div>}
  </div>

  <button type="submit" disabled={isLoading}>
    {isLoading ? <AiOutlineLoading3Quarters className="spin" size={24} /> : "Register"}
  </button>

  <div className="forgot">
    <Link to="/login">Already have an account? Login</Link>
  </div>
</form>

  );
};

export default Registration;
