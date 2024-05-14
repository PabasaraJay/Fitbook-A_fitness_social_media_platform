import React, { useState, useEffect } from "react";
import axios from "axios";

const RightBar = ({ userName, profilePic }) => {
  const [formData, setFormData] = useState(null);

  const fetchTodayStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/exercise-duration/currentUpdate/${userName}`
      );
      const exerciseDurationData = response.data;
      setFormData(exerciseDurationData);
    } catch (error) {
      console.error("Error fetching exercise duration data:", error);
    }
  };

  useEffect(() => {
    if (userName) {
      fetchTodayStatus();
    }
  }, [userName]);

  return (
    <div
      style={{
        flex: 3,
        position: "sticky",
        top: "70px",
        height: "calc(100vh - 70px)",
        overflow: "scroll",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div style={{ padding: "20px" }}>
        <div style={{ padding: "20px", marginBottom: "20px", backgroundColor: "#ffffff", boxShadow: "0px 0px 15px 1px rgba(0, 0, 0, 0.09)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", fontWeight: 500 }}>
            {profilePic && <img src={`data:image/jpeg;base64,${profilePic}`} alt="Profile" style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover" }} />}
            <span>{userName}</span>
          </div>
          <h4 style={{ marginTop: "20px", marginBottom: "20px" }}>{userName}'s Current workout status</h4>
          <form>
            {formData && (
              <>
                <div style={{ marginBottom: "20px" }}>
                  <div className="special" style={{ lineHeight: "2" }}>
                    <div key="startTime">
                      <label style={{ fontWeight: "bold" }}>Time enter into the Gym :</label>
                      <span>{formData.startTime}</span>
                    </div>
                    <div key="endTime">
                      <label style={{ fontWeight: "bold" }}>Time exit from the Gym :</label>
                      <span>{formData.endTime}</span>
                    </div>
                    <div key="calories">
                      <label style={{ fontWeight: "bold" }}>Calories burned :</label>
                      <span>{formData.calories} calories</span>
                    </div>
                  </div>
                  {/* Add other fields as needed */}
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
