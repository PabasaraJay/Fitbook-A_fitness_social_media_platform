import React, { useState } from "react";
import axios from "axios";
import Image from "../../assets/img.png";

const ShareWorkout = ({ userName, profilePic }) => {
    const [exercises, setExercises] = useState([]);
    const [workoutPlanName, setWorkoutPlanName] = useState("");
    const [description, setDescription] = useState("");

    const addExercise = () => {
        setExercises(prevExercises => [
            ...prevExercises,
            {
                exerciseName: "",
                exerciseDescription: "",
                exerciseImage: null, // Initialize the image as null
                exercisePreviewImage: null // Initialize the preview image as null
            }
        ]);
    };

    const handleExerciseChange = (index, event) => {
        const { name, value } = event.target;
        setExercises(prevExercises => {
            const updatedExercises = [...prevExercises];
            updatedExercises[index][name] = value;
            return updatedExercises;
        });
    };

    const handleImageChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file); // Create a URL for the selected image
            setExercises(prevExercises => {
                const updatedExercises = [...prevExercises];
                updatedExercises[index].exerciseImage = file;
                updatedExercises[index].exercisePreviewImage = imageURL; // Set the preview image URL
                return updatedExercises;
            });
        }
    };

    const uploadWorkout = async () => {
        // Upload the workout plan description
        const descriptionFormData = new FormData();
        descriptionFormData.append("workoutPlan", workoutPlanName);
        descriptionFormData.append("description", description);
        descriptionFormData.append("userName", userName);
        
        try {
            // Upload the workout plan description
            const descriptionResponse = await axios.post(
                "http://localhost:8080/api/exercises/saveDescription",
                descriptionFormData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(descriptionResponse.data);
    
            // If description upload is successful, proceed with exercises
            if (descriptionResponse.status === 201) {
                for (const exercise of exercises) {
                    // Create a new FormData object for each exercise
                    const exerciseFormData = new FormData();
                    exerciseFormData.append("workoutName", workoutPlanName);
                    exerciseFormData.append("exerciseName", exercise.exerciseName);
                    exerciseFormData.append("description", exercise.exerciseDescription);
                    
                    // Append the exercise image if available
                    if (exercise.exerciseImage) {
                        exerciseFormData.append("Image", exercise.exerciseImage);
                    }
    
                    // Upload each exercise
                    const exerciseResponse = await axios.post(
                        "http://localhost:8080/api/exercises/saveExercise",
                        exerciseFormData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    );
                    console.log(exerciseResponse.data);
                }
    
                console.log("Workout plan and exercises uploaded successfully.");
                // Handle success response (e.g., notify user or clear form)
            } else {
                console.error("Failed to upload workout description:", descriptionResponse.statusText);
            }
        } catch (error) {
            console.error("Error uploading workout plan or exercises:", error);
            // Handle error response (e.g., notify user)
        }
    };    

    return (
        <div className="share">
            <div className="container" style={{ padding: "20px" }}>
                <div className="top" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <img src={`data:image/jpeg;base64,${profilePic}`} alt="Profile" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} />
                    <input
                        className="workout-plan-name-input"
                        type="text"
                        placeholder="Enter Name of the Workout Plan"
                        value={workoutPlanName}
                        onChange={(e) => setWorkoutPlanName(e.target.value)}
                        style={{ border: "none", outline: "none", padding: "20px 10px", backgroundColor: "transparent", width: "60%", color: "#000000" }}
                    />
                </div>
                <hr style={{ margin: "20px 0px", border: "none", height: "0.5px", backgroundColor: "#ccc" }} />
                <textarea
                    className="workout-plan-description"
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ width: "100%", resize: "none", height: "100px" }}
                />
                <div className="exercises">
                    {exercises.map((exercise, index) => (
                        <div className="exercise" key={index} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px", marginBottom: "10px" }}>
                            <input
    type="text"
    placeholder="Exercise Name"
    name="exerciseName"
    value={exercise.exerciseName}
    onChange={(e) => handleExerciseChange(index, e)}
    style={{
        marginBottom: "20px",
        width: "100%", /* Changed width to 100% */
        height: "40px", /* Increased height for better visibility */
        padding: "10px", /* Added padding for better spacing */
        borderRadius: "5px", /* Added border radius for a softer look */
        border: "1px solid #ccc", /* Added border for better distinction */
        boxSizing: "border-box" /* Added box-sizing for consistent sizing */
    }}
/>
<textarea
    placeholder="Exercise Description"
    name="exerciseDescription"
    value={exercise.exerciseDescription}
    onChange={(e) => handleExerciseChange(index, e)}
    style={{
        marginBottom: "20px",
        width: "100%", /* Changed width to 100% */
        height: "120px", /* Increased height for better visibility */
        resize: "none", /* Disabled resizing */
        padding: "10px", /* Added padding for better spacing */
        borderRadius: "5px", /* Added border radius for a softer look */
        border: "1px solid #ccc", /* Added border for better distinction */
        boxSizing: "border-box" /* Added box-sizing for consistent sizing */
    }}
/>

                            {exercise.exercisePreviewImage && (
                                <img
                                    src={exercise.exercisePreviewImage}
                                    alt="Exercise Preview"
                                    style={{ maxWidth: "100%", maxHeight: "500px", objectFit: "cover", marginTop: "20px" }}
                                />
                            )}
                            <div className="left" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                <input
                                    type="file"
                                    id={`file-${index}`}
                                    style={{ display: "none" }}
                                    onChange={(e) => handleImageChange(index, e)}
                                />
                                <label htmlFor={`file-${index}`} style={{ cursor: "pointer" }}>
                                    <div className="item" style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                                        <img src={Image} alt="" style={{ height: "20px" }} />
                                        <span style={{ fontSize: "12px", color: "gray" }}>Add Image</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bottom" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <button onClick={addExercise} style={{ border: "none", padding: "5px", color: "#ffffff", cursor: "pointer", backgroundColor: "#5271ff", borderRadius: "3px" }}>Add Exercise</button>
                    <button onClick={uploadWorkout} style={{ border: "none", padding: "5px", color: "#ffffff", cursor: "pointer", backgroundColor: "#5271ff", borderRadius: "3px" }}>Upload Workout Plan</button>
                </div>
            </div>
        </div>
    );
};

export default ShareWorkout;
