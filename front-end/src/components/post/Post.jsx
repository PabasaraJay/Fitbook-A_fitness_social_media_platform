import React, { useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import axios from "axios";

const Post = ({ post, userName }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // TEMPORARY
  const liked = false;

  const deletePost = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/delete/${id}`);
      alert("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    }
  };

  const updateDescription = async (id, newDescription) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/descriptionUpdate/${id}/${newDescription}`
      );
      alert("Post description updated successfully!");
      return response.data;
    } catch (error) {
      console.error("Error updating description:", error);
      alert("Failed to update description. Please try again.");
    }
  };

  const handleDeletePost = () => {
    deletePost(post.id);
    setMenuOpen(false);
  };

  const handleUpdateDescription = () => {
    const newDescription = prompt("Enter a new description:");
    if (newDescription !== null && newDescription.trim() !== "") {
      updateDescription(post.id, newDescription);
      setMenuOpen(false);
    }
  };

  return (
    <div
      style={{
        boxShadow: "0px 0px 25px -10px rgba(0, 0, 0, 0.38)",
        borderRadius: "20px",
        backgroundColor: "#f8f9fa",
        color: "#212529",
        padding: "20px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={`data:image/jpeg;base64,${post.profilePicture}`}
              alt="Profile"
              style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}
            />
            <div style={{ marginLeft: "10px" }}>
              <Link to={`/profile/${post.userName}`} style={{ textDecoration: "none", color: "#212529" }}>
                <span style={{ fontWeight: 500 }}>{post.userName}</span>
              </Link>
              <span style={{ fontSize: "12px" }}> • 1 min ago</span>
            </div>
          </div>
          {post.userName === userName && (
            <div style={{ position: "relative" }}>
              <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
              {menuOpen && (
                <div style={{ position: "absolute", top: "100%", right: 0, backgroundColor: "#f8f9fa", border: "1px solid #dee2e6", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", zIndex: 10 }}>
                  <button
                    onClick={handleDeletePost}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "8px",
                      textAlign: "left",
                      border: "none",
                      backgroundColor: "transparent",
                      color: "#212529",
                      cursor: "pointer",
                      borderBottom: "1px solid #dee2e6",
                    }}
                  >
                    Delete Post
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
                      color: "#212529",
                      cursor: "pointer",
                    }}
                  >
                    Update Description
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div style={{ margin: "20px 0px" }}>
          <p>{post.description}</p>
          <img src={`data:image/jpeg;base64,${post.post}`} alt="Post" style={{ width: "100%", maxHeight: "500px", objectFit: "cover", marginTop: "20px" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px", fontSize: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            <p>{post.likes}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            <p>{post.comments}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} commenterName={userName} />}
      </div>
    </div>
  );
};

export default Post;
