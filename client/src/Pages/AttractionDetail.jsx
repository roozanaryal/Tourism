import manang from "../assets/Manang/m1.webp";
import Navbar from "../Components/Navbar";

function AttractionDetail() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-[#f6f6f6] to-[#e2e8f0]">
      {/* Navbar Overlay */}
      <div className="fixed top-0 left-0 w-full z-20">
        <Navbar />
      </div>

      {/* Hero Image Section */}
      <div className="relative h-[48vh] w-full flex items-center justify-center overflow-hidden">
        <img
          src={manang}
          alt="Manang"
          className="w-full h-full object-cover object-center brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b]/70 to-transparent" />
        <h1 className="absolute bottom-8 left-1/2 -translate-x-1/2 text-4xl md:text-5xl font-bold text-white drop-shadow-lg tracking-wide z-10">
          Manang
        </h1>
      </div>

      {/* Details Card */}
      <div className="relative max-w-3xl mx-auto -mt-20 z-10">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl px-6 md:px-12 py-8 border border-gray-200">
          <h2 className="font-semibold text-2xl md:text-3xl text-primarycolor mb-3 text-center">
            Discover the Beauty of Manang
          </h2>
          <p className="text-gray-700 text-lg text-justify leading-relaxed">
            Manang, nestled in the heart of the Himalayas, offers breathtaking landscapes, unique culture, and adventure for every traveler. Explore its serene valleys, crystal-clear rivers, and traditional villages surrounded by snow-capped peaks. Whether you're trekking, sightseeing, or immersing in local traditions, Manang promises an unforgettable experience in Nepal's natural paradise.
          </p>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="max-w-4xl mx-auto mt-12 px-3 pb-14">
        <h3 className="text-xl font-semibold mb-3 text-primarycolor text-center">Location</h3>
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <iframe
            className="w-full h-[350px] md:h-[450px]"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3531.4167866324383!2d85.31019177500158!3d27.73528792425949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1724133413568!5m2!1sen!2snp"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Manang Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default AttractionDetail;
