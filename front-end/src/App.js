import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import MealPlansPage from "./pages/mealPlansPage/MealPlansPage";
import WorkoutPlanPage from "./pages/workoutsPage/WorkoutsPage";
// import SupplementPage from "./pages/supplementsPage/SupplementsPage";
import VideosPage from "./pages/videosPage/VideosPage";
import WorkoutStatusPage from "./pages/workoutStatusPage/WorkoutStatusPage";
import Profile from "./pages/profile/Profile";
// import Messages from "./pages/messagePage/MessagePage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home/:userName" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />
          <Route path="/mealPlanes/:userName" element={<MealPlansPage />} />
          <Route path="/workoutPlans/:userName" element={<WorkoutPlanPage />} />

          <Route path="/videos/:userName" element={<VideosPage />} />
          <Route
            path="/currentWorkoutStatus/:userName"
            element={<WorkoutStatusPage />}
          />
          <Route path="/profile/:userName" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
