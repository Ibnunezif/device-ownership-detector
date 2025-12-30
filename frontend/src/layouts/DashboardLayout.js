// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import ProfileMenu from "../components/ProfileMenu";
// import { useProfile } from "../context/ProfileContext";
// import { useAuthContext } from "../hooks/useAuthContext";

// const DashboardLayout = ({ children }) => {
//   const { user } = useAuthContext();
//   const { profileView, setProfileView } = useProfile();

//   if (!user) return null; // prevents sidebar/navbar from showing before login

//   return (
//     <>
//       <Navbar />
//       <div
//         className="layout"
//         onClick={() => {
//           if (profileView === true) setProfileView(false);
//         }}
//       >
//         <Sidebar />
//         <div className="pages">
//           <ProfileMenu />
//           {children}
//         </div>
//       </div>
//     </>
//   );
// };

// export default DashboardLayout;
