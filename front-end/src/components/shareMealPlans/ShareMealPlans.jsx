import React, { useState } from "react";
import axios from "axios";
import Image from "../../assets/img.png";

const ShareMealPlans = ({ userName, profilePic }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [description, setDescription] = useState("");
  const [mealName, setMealName] = useState("");
  const [recipe, setRecipe] = useState("");
  const [portion, setPortion] = useState("");
  const [mealSchedule, setMealSchedule] = useState("");
  const [nutritions, setNutritions] = useState("");
  const [vegetarian, setVegetarian] = useState(false);
  const [vegan, setVegan] = useState(false);
  const [glutenFree, setGlutenFree] = useState(false);
  const [dairyFree, setDairyFree] = useState(false);
  const [nutFree, setNutFree] = useState(false);

  const handleVegetarianChange = (e) => setVegetarian(e.target.checked);
  const handleVeganChange = (e) => setVegan(e.target.checked);
  const handleGlutenFreeChange = (e) => setGlutenFree(e.target.checked);
  const handleDairyFreeChange = (e) => setDairyFree(e.target.checked);
  const handleNutFreeChange = (e) => setNutFree(e.target.checked);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("userName", userName);
      formData.append("post", selectedImage);
      formData.append("mealName", mealName);
      formData.append("description", description);
      formData.append("recipe", recipe);
      formData.append("portion", portion);
      formData.append("mealSchedule", mealSchedule);
      formData.append("nutrition", nutritions);
      formData.append("vegetarian", vegetarian);
      formData.append("vegan", vegan);
      formData.append("glutenFree", glutenFree);
      formData.append("dairyFree", dairyFree);
      formData.append("nutFree", nutFree);

      const response = await axios.post(
        "http://localhost:8080/shareMealPlan",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data); // Handle success response
      alert("MealPlan shared successfully!");
    } catch (error) {
      console.error("Error posting image:", error); // Handle error
      alert("Error in meal plan sharing");
    }
  };

  return (
    <div
      style={{
        borderRadius: "20px",
        backgroundColor: "#f7f7f7",
        color: "#333",
        marginBottom: "20px",
        boxShadow: "0px 0px 25px -10px rgba(0, 0, 0, 0.38)",
      }}
    >
      <div style={{ padding: "20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <img
            src={`data:image/jpeg;base64,${profilePic}`}
            alt="Profile"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <input
            type="text"
            placeholder={`Enter Name of the Meal `}
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              padding: "10px",
              backgroundColor: "transparent",
              width: "60%",
              borderBottom: "1px solid #ccc",
            }}
          />
        </div>
        <div>
          <span style={{ fontWeight: "bold", marginRight: "10px" }}>
            Description
          </span>
          <hr
            style={{
              flexGrow: 1,
              border: "0",
              borderTop: "1px solid #ccc",
              marginLeft: "10px",
            }}
          />
        </div>
        <textarea
          className="description"
          placeholder={`Enter Description About Meal `}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            height: "80px",
            resize: "none",
            border: "1px solid #ccc",
            padding: "10px",
            marginTop: "10px",
          }}
        />
        {/* Repeat similar styling for other sections */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <span style={{ fontWeight: "bold", marginRight: "10px" }}>
            Recipe
          </span>
          <hr
            style={{
              flexGrow: 1,
              border: "0",
              borderTop: "1px solid #ccc",
              marginLeft: "10px",
            }}
          />
        </div>
        <textarea
          className="recipe"
          placeholder={`Enter Recipe of the Meal `}
          value={recipe}
          onChange={(e) => setRecipe(e.target.value)}
          style={{
            width: "100%",
            height: "80px",
            resize: "none",
            border: "1px solid #ccc",
            padding: "10px",
            marginTop: "10px",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <span style={{ fontWeight: "bold", marginRight: "10px" }}>
            Portion per Time
          </span>
          <hr
            style={{
              flexGrow: 1,
              border: "0",
              borderTop: "1px solid #ccc",
              marginLeft: "10px",
            }}
          />
        </div>
        <select
          value={portion}
          onChange={(e) => setPortion(e.target.value)}
          style={{
            width: "100%",
            height: "40px",
            border: "1px solid #ccc",
            padding: "5px",
            marginTop: "10px",
          }}
        >
          <option value="">Select Portion of the Meal</option>
          <option value="Small">Small (100 g)</option>
          <option value="Medium">Medium (200 g)</option>
          <option value="Large">Large (300 g)</option>
        </select>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <span style={{ fontWeight: "bold", marginRight: "10px" }}>
            Meal Schedule
          </span>
          <hr
            style={{
              flexGrow: 1,
              border: "0",
              borderTop: "1px solid #ccc",
              marginLeft: "10px",
            }}
          />
        </div>
        <select
          value={mealSchedule}
          onChange={(e) => setMealSchedule(e.target.value)}
          style={{
            width: "100%",
            height: "40px",
            border: "1px solid #ccc",
            padding: "5px",
            marginTop: "10px",
          }}
        >
          <option value="">Select Schedule of the Meal</option>
          <option value="daily">Once a week</option>
          <option value="two">Two times per week</option>
          <option value="three">Three times per week</option>
          <option value="four">Four times per week</option>
          <option value="weekends">Weekends only</option>
        </select>
      </div>
      {/* Image preview */}
      {previewImage && (
        <img
          src={previewImage}
          alt="SelectImage"
          style={{
            maxWidth: "100%",
            maxHeight: "500px",
            objectFit: "cover",
            marginTop: "20px",
          }}
        />
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <label htmlFor="file" style={{ cursor: "pointer" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              <img src={Image} alt="" style={{ height: "20px" }} />
              <span style={{ fontSize: "12px", color: "gray" }}>Add Image</span>
            </div>
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
        <button
          onClick={handlePost}
          style={{
            border: "none",
            padding: "10px 20px",
            color: "white",
            cursor: "pointer",
            backgroundColor: "#5271ff",
            borderRadius: "3px",
          }}
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default ShareMealPlans;
