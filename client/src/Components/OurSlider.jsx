import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";

function OurSlider({ children }) {
   var settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 1000, // 1 second
      pauseOnHover: true,
   };
   return (
      <>
         <Slider {...settings}>{children}</Slider>
      </>
   );
}

OurSlider.propTypes = {
   children: PropTypes.node.isRequired,
};

export default OurSlider;
