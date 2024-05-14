import React, { useState, useEffect } from "react";
import MealPlan from "../mealplan/MealPlan";
import axios from "axios";

const MealPlans = ({ userName }) => {
  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/allMealPlanes`);
        setMealPlans(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
      {mealPlans.map((mealPlan) => (
        <MealPlan meal={mealPlan} userName={userName} key={mealPlan.id} />
      ))}
    </div>
  );
};

export default MealPlans;
