import { useState } from "react";
import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";
import InputBox from "../Components/InputBox";
import { useAuth } from "../Context/AuthContext";
import useAddPost from "../hooks/useAddPost";

function AddPostModal({ showModal, onClose }) {
  const [placename, setPlacename] = useState("");
  const [review, setReview] = useState("");
  const { user } = useAuth();
  const { addPost, loading, error, success } = useAddPost();
  
  // Don't show modal if user is not admin or not logged in
  if (!showModal || !user || !user.isAdmin) return null;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await addPost(placename, review);
      setPlacename("");
      setReview("");
      
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      // Error is handled in the hook
      console.error(err);
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
