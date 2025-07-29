import { useState } from "react";
import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";
import InputBox from "../Components/InputBox";
import { useAuth } from "../Context/AuthContext";
import baseURL from "../Constants/baseURL";

function AddPostModal({ showModal, onClose }) {
  const [placename, setPlacename] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const { user } = useAuth();
  
  // Don't show modal if user is not admin or not logged in
  if (!showModal || !user || !user.isAdmin) return null;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      const token = localStorage.getItem("neptour-token");
      
      // Check if token exists
      if (!token) {
        throw new Error("Authentication token not found. Please log out and log back in.");
      }
      
      const response = await fetch(`${baseURL}/post/createpost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ placename, review: parseInt(review) })
      });
      
      // Check if response is JSON before parsing
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        // If it's an HTML response, it's likely an error page
        if (contentType && contentType.includes("text/html")) {
          throw new Error("Authentication error. Please log out and log back in.");
        }
        throw new Error("Server returned an invalid response. Please try again.");
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        // If it's a 401 error, it's likely a token issue
        if (response.status === 401) {
          throw new Error(data.message || "Authentication error. Please log out and log back in.");
        }
        throw new Error(data.message || "Failed to create post");
      }
      
      setSuccess("Place added successfully!");
      setPlacename("");
      setReview("");
      
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <div className="fixed inset-0 w-screen bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
        <form className="w-1/3 flex flex-col bg-white" onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-center py-2">{error}</div>}
          {success && <div className="text-green-500 text-center py-2">{success}</div>}
          {loading && <div className="text-center py-2">Adding place...</div>}
          <IoMdClose
            onClick={onClose}
            className="place-self-end text-3xl font-bold m-2 hover:drop-shadow-lg hover:cursor-pointer text-primarycolor"
          />
          <div className="">
            <h1 className="font-semibold text-black text-4xl text-center">
              Add <span className="text-primarycolor">Place</span>
            </h1>
            
            <div className="mt-8">
              <InputBox 
                placeholder="Enter place name"
                value={placename} 
                onChange={(e) => setPlacename(e.target.value)} 
                type="text"
              />
              
              <div className="flex justify-center items-center mt-4 mb-4 mx-8 bg-gray-700 bg-opacity-30 rounded-sm">
                <label className="text-primarycolor mx-2">Review:</label>
                <select 
                  value={review} 
                  onChange={(e) => setReview(e.target.value)} 
                  className="w-[85%] bg-transparent outline-none p-4 text-primarycolor"
                  required
                >
                  <option value="">Select a rating</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-center py-4">
            <button 
              type="submit" 
              className="bg-primarycolor text-white py-2 px-11 rounded-3xl hover:bg-[#1a3a5f] transition-colors"
            >
              Add Place
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddPostModal;

AddPostModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
