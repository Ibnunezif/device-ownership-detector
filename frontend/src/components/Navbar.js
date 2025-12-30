import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { Avatar } from "../components/Avatar.js";
import { useProfile } from '../context/ProfileContext.js';

const Navbar = () => {
  const { user } = useAuthContext();
  const { profileView, setProfileView } = useProfile();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>ASTU DEVICE SECURITY</h1>
        </Link>
        <nav className="nav-right">
          {user ? (
            <Avatar
              image={user.profile_picture}
              name={user.first_name + " " + user.last_name}
              onClick={() => setProfileView(!profileView)}
            />
          ) : (
            location.pathname !== "/register" && (
              <button
                style={{
                  background: "var(--primary)",
                  color: "#fff",
                  padding: "10px 15px",
                  borderRadius: "7px",
                  fontSize: "16px",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.3s ease",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--primaryhover)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--primary)"}
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            )
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
