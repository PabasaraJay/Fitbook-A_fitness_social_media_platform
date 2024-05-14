import React, { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { FaFileAlt, FaPlay, FaDumbbell, FaUtensils, FaHeartbeat } from "react-icons/fa";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = ({ userName }) => {
  const navigate = useNavigate();
  const { toggle, darkMode } = useContext(DarkModeContext);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/profile-photo/${userName}`);
        setProfilePic(response.data); // assuming response.data is the Base64 image string
      } catch (error) {
        console.error("Error fetching profile photo:", error);
      }
    };

    fetchProfilePhoto();
  }, [userName]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", height: "50px", borderBottom: "1px solid #ccc", position: "sticky", top: 0, backgroundColor: darkMode ? "#333" : "#fff", color: darkMode ? "#fff" : "#333", zIndex: 999 }}>
      <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
        <span style={{ fontWeight: "bold", fontSize: "20px", color: darkMode ? "#fff" : "#000" }}>Fitbook</span>
        <button onClick={() => handleNavigation(`/home/${userName}`)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <HomeOutlinedIcon style={{ fontSize: "20px" }} />
        </button>
        {darkMode ? (
          <button onClick={toggle} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <WbSunnyOutlinedIcon style={{ fontSize: "20px" }} />
          </button>
        ) : (
          <button onClick={toggle} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <DarkModeOutlinedIcon style={{ fontSize: "20px" }} />
          </button>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", border: "1px solid #ccc", borderRadius: "5px", padding: "5px" }}>
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." style={{ border: "none", width: "500px", backgroundColor: "transparent", color: darkMode ? "#fff" : "#333" }} />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <button onClick={() => handleNavigation(`/home/${userName}`)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <FaFileAlt style={{ fontSize: "20px" }} />
          <span style={{ fontSize: "12px" }}>Posts</span>
        </button>
        <button onClick={() => handleNavigation(`/videos/${userName}`)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <FaPlay style={{ fontSize: "20px" }} />
          <span style={{ fontSize: "12px" }}>Watch</span>
        </button>
        <button onClick={() => handleNavigation(`/workoutPlans/${userName}`)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <FaDumbbell style={{ fontSize: "20px" }} />
          <span style={{ fontSize: "12px" }}>Workouts</span>
        </button>
        <button onClick={() => handleNavigation(`/mealPlanes/${userName}`)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <FaUtensils style={{ fontSize: "20px" }} />
          <span style={{ fontSize: "12px" }}>Meal Planning</span>
        </button>
        <button onClick={() => handleNavigation(`/currentWorkoutStatus/${userName}`)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <FaHeartbeat style={{ fontSize: "20px" }} />
          <span style={{ fontSize: "12px" }}>Workout Status</span>
        </button>
        <br />
        <br />
        <br />
        <br />
        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontWeight: 500 }}>
          {profilePic && <img src={`data:image/jpeg;base64,${profilePic}`} alt="Profile" style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover" }} />}
          <span>{userName}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
