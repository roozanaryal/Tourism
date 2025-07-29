import manang from "../assets/Manang/m1.webp";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

function GuideCard({ guide }) {
  // Function to render stars based on rating
  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="flex p-4 items-center shadow-xl bg-white gap-5 w-[45vw] h-[40vh] mb-5 mt-5 mr-5">
      <div className="w-[50%] h-full">
        <img
          src={manang}
          alt={guide.name}
          className="object-cover h-full w-full"
        />
      </div>
      <div className="flex flex-col w-[50%]">
        <p className="font-bold text-2xl">{guide.name}</p>
        <div className="text-gray-500">{guide.location}</div>
        <hr />
        <div>
          <p className="py-3 text-sm">
            {guide.description}
          </p>
          <hr />
          <div className="flex justify-between pt-2 px-10">
            <div className="flex flex-col items-center justify-evenly">
              <div>Reviews</div>
              <div>{guide.reviews}</div>
            </div>
            <div className="flex flex-col items-center justify-between">
              <div>Rating</div>
              <div className="flex items-center gap-2">
                {renderStars(guide.rating)}
                <span>{guide.rating}.0</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <button 
              className="bg-primarycolor hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => toast.success(`Booking for ${guide.name} processed!`)}
            >
              Book Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuideCard;

GuideCard.propTypes = {
  guide: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    reviews: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
