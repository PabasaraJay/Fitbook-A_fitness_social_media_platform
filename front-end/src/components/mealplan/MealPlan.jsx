import React, { useState } from "react";
import axios from "axios";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import MealPlanComments from "../mealPlanComments/MealPlanComment";
import Sad from "@mui/icons-material/SentimentVeryDissatisfied";
import Happy from "@mui/icons-material/SentimentSatisfiedAlt";

const MealPlan = ({ meal, userName }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Delete meal plan
  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/deleteMeal/${id}`);
      alert("Meal plan deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete meal plan. Please try again.");
    }
  };

  // Update description
  const updateDescription = async (id, newDescription) => {
    try {
      await axios.patch(
        `http://localhost:8080/descriptionUpdateMeal/${id}/${newDescription}`
      );
      alert("Description updated successfully!");
    } catch (error) {
      console.error("Error updating description:", error);
      alert("Failed to update description. Please try again.");
    }
  };

  // Update name
  const updateName = async (id, newName) => {
    try {
      await axios.patch(`http://localhost:8080/name/${id}/${newName}`);
      alert("Name updated successfully!");
    } catch (error) {
      console.error("Error updating name:", error);
      alert("Failed to update name. Please try again.");
    }
  };

  // Update recipe
  const updateRecipe = async (id, newRecipe) => {
    try {
      await axios.patch(`http://localhost:8080/recipe/${id}/${newRecipe}`);
      alert("Recipe updated successfully!");
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert("Failed to update recipe. Please try again.");
    }
  };

  // Update schedule
  const updateSchedule = async (id, newSchedule) => {
    try {
      await axios.patch(`http://localhost:8080/schedule/${id}/${newSchedule}`);
      alert("Schedule updated successfully!");
    } catch (error) {
      console.error("Error updating schedule:", error);
      alert("Failed to update schedule. Please try again.");
    }
  };

  // Update nutrition
  const updateNutrition = async (id, newNutrition) => {
    try {
      await axios.patch(
        `http://localhost:8080/nutrition/${id}/${newNutrition}`
      );
      alert("Nutrition updated successfully!");
    } catch (error) {
      console.error("Error updating nutrition:", error);
      alert("Failed to update nutrition. Please try again.");
    }
  };

  const handleDeletePost = () => {
    deletePost(meal.id);
    setMenuOpen(false);
  };

  const handleUpdateDescription = () => {
    const newDescription = prompt("Enter new description:", meal.description);
    if (newDescription !== null && newDescription.trim() !== "") {
      updateDescription(meal.id, newDescription);
      setMenuOpen(false);
    }
  };

  const handleUpdateName = () => {
    const newName = prompt("Enter new name:", meal.mealName);
    if (newName !== null && newName.trim() !== "") {
      updateName(meal.id, newName);
      setMenuOpen(false);
    }
  };

  const handleUpdateRecipe = () => {
    const newRecipe = prompt("Enter new recipe:", meal.recipe);
    if (newRecipe !== null && newRecipe.trim() !== "") {
      updateRecipe(meal.id, newRecipe);
      setMenuOpen(false);
    }
  };

  const handleUpdateSchedule = () => {
    const newSchedule = prompt("Enter new schedule:", meal.schedule);
    if (newSchedule !== null && newSchedule.trim() !== "") {
      updateSchedule(meal.id, newSchedule);
      setMenuOpen(false);
    }
  };

  const handleUpdateNutrition = () => {
    const newNutrition = prompt("Enter new nutrition:", meal.nutrition);
    if (newNutrition !== null && newNutrition.trim() !== "") {
      updateNutrition(meal.id, newNutrition);
      setMenuOpen(false);
    }
  };

  return (
    <div
      style={{
        borderRadius: "20px",
        backgroundColor: "#f7f7f7",
        color: "#333",
        padding: "20px",
        marginBottom: "20px",
        boxShadow: "0px 0px 25px -10px rgba(0, 0, 0, 0.38)",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: "20px" }}>
            <img
              src={`data:image/jpeg;base64,${meal.userProfilePicture}`}
              alt="Profile"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <div>
              <Link
                to={`/profile/${meal.userName}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span style={{ fontWeight: "500" }}>{meal.userName}</span>
              </Link>
              <span style={{ fontSize: "12px" }}>1 min ago</span>
            </div>
          </div>
          {meal.userName === userName && (
            <div style={{ position: "relative" }}>
              <MoreHorizIcon
                onClick={() => setMenuOpen(!menuOpen)}
                style={{ cursor: "pointer" }}
              />
              {menuOpen && (
                <div
                  style={{
                    width: "200px",
                    position: "absolute",
                    top: "100%",
                    right: "0",
                    backgroundColor: "#f7f7f7",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "5px 10px",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                    zIndex: "10",
                  }}
                >
                  <button
                    onClick={handleDeletePost}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "8px",
                      textAlign: "left",
                      border: "none",
                      backgroundColor: "transparent",
                      color: "#333",
                      cursor: "pointer",
                      borderBottom: "1px solid #ccc",
                    }}
                  >
                    Delete Meal Plan
                  </button>
                  <button
                    onClick={handleUpdateName}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "8px",
                      textAlign: "left",
                      border: "none",
                      backgroundColor: "transparent",
                      color: "#333",
                      cursor: "pointer",
                    }}
                  >
                    Update Meal Plan Name
                  </button>
                  <button
                    onClick={handleUpdateDescription}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "8px",
                      textAlign: "left",
                      border: "none",
                      backgroundColor: "transparent",
                      color: "#333",
                      cursor: "pointer",
                    }}
                  >
                    Update Description
                  </button>
                  <button
                    onClick={handleUpdateRecipe}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "8px",
                      textAlign: "left",
                      border: "none",
                      backgroundColor: "transparent",
                      color: "#333",
                      cursor: "pointer",
                    }}
                  >
                    Update Recipe
                  </button>
                  <button
                    onClick={handleUpdateNutrition}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "8px",
                      textAlign: "left",
                      border: "none",
                      backgroundColor: "transparent",
                      color: "#333",
                      cursor: "pointer",
                    }}
                  >
                    Update Nutritional Benefits
                  </button>
                  <button
                    onClick={handleUpdateSchedule}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "8px",
                      textAlign: "left",
                      border: "none",
                      backgroundColor: "transparent",
                      color: "#333",
                      cursor: "pointer",
                    }}
                  >
                    Update Schedule
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div
          style={{
            marginTop: "20px",
            borderTop: "1px solid #ccc",
            paddingTop: "20px",
          }}
        >
          <h2>{meal.mealName}</h2>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontWeight: "bold", marginRight: "10px" }}>
              Description
            </span>
            <hr
              style={{
                flexGrow: "1",
                border: "0",
                borderTop: "1px solid #ccc",
                marginLeft: "10px",
              }}
            />
          </div>
          <p style={{ margin: "10px 0" }}>{meal.description}</p>
          <hr />
          <img
            src={`data:image/jpeg;base64,${meal.post}`}
            alt="NoImages"
            style={{
              width: "100%",
              maxHeight: "300px",
              objectFit: "cover",
              marginTop: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
            }}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontWeight: "bold", marginRight: "10px" }}>
              Recipe
            </span>
            <hr
              style={{
                flexGrow: "1",
                border: "0",
                borderTop: "1px solid #ccc",
                marginLeft: "10px",
              }}
            />
          </div>
          <p style={{ margin: "10px 0" }}>{meal.recipe}</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontWeight: "bold", marginRight: "10px" }}>
              Portion per time
            </span>
            <hr
              style={{
                flexGrow: "1",
                border: "0",
                borderTop: "1px solid #ccc",
                marginLeft: "10px",
              }}
            />
          </div>
          <p style={{ margin: "10px 0" }}>{meal.portion}</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontWeight: "bold", marginRight: "10px" }}>
              Meal Schedule
            </span>
            <hr
              style={{
                flexGrow: "1",
                border: "0",
                borderTop: "1px solid #ccc",
                marginLeft: "10px",
              }}
            />
          </div>
          <p style={{ margin: "10px 0" }}>{meal.schedule}</p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              fontSize: "14px",
              color: "#5271ff",
            }}
            onClick={() => setCommentOpen(!commentOpen)}
          >
            <TextsmsOutlinedIcon />
            <p>{meal.comments}</p>
          </div>
        </div>
        {commentOpen && (
          <MealPlanComments postId={meal.id} commenterName={userName} />
        )}
      </div>
    </div>
  );
};

export default MealPlan;
