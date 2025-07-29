import { useEffect, useState } from "react";
import TopSection from "../Components/TopSection";
import Button from "../Components/Button";
import { Link } from "react-router-dom";
import useGetAttraction from "../hooks/useGetAttraction";
import all_product from "../assets/assets";

function Attraction() {
   const { getAttraction, loading, error, data } = useGetAttraction();
   const [retryCount, setRetryCount] = useState(0);

   useEffect(() => {
      let isMounted = true;
      
      const fetchData = async () => {
         if (isMounted && retryCount < 3) {
            try {
               await getAttraction();
            } catch {
               if (isMounted) {
                  setRetryCount(prev => prev + 1);
               }
            }
         }
      };
      
      fetchData();
      
      return () => {
         isMounted = false;
      };
   }, [getAttraction, retryCount]);

   if (loading) {
      return (
         <>
            <TopSection title="Attractions" />
            <div className="flex justify-center items-center h-64">
               <div className="spinner"></div>
            </div>
         </>
      );
   }

   if (error) {
      return (
         <>
            <TopSection title="Attractions" />
            <div className="flex justify-center items-center h-64">
               <p className="text-red-500">Error: {error}</p>
            </div>
         </>
      );
   }

   return (
      <>
         <TopSection title="Attractions" />
         <div className="flex flex-wrap justify-center items-center my-12 mx-16 gap-14">
            {data && data.length > 0 ? (
               data.map((attraction) => {
                  // Find matching image from assets
                  const product = all_product.find(p => p.name.toLowerCase() === attraction.placename.toLowerCase());
                  const imageUrl = product ? product.image : null;
                  
                  return (
                     <div key={attraction._id} className="w-[21vw] h-64 shadow-lg shadow-gray-300 rounded-sm attraction-card">
                        {imageUrl ? (
                           <img 
                              src={imageUrl} 
                              alt={attraction.placename} 
                              className="w-full object-cover h-[60%]" 
                           />
                        ) : (
                           <div className="w-full h-[60%] bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500">No Image</span>
                           </div>
                        )}
                        <h1 className="font-semibold px-3 py-1">{attraction.placename}</h1>
                        <div className="px-3">Rating: {attraction.review}/5</div>
                        <div className="flex justify-around items-center">
                           <h3 className="">Review: {attraction.review}</h3>
                           <Button className="px-3 py-1 rounded-md">
                              <Link to={`/detail/${attraction._id}`}>Explore More</Link>
                           </Button>
                        </div>
                     </div>
                  );
               })
            ) : (
               <div className="flex justify-center items-center h-64 w-full">
                  <p>No attractions found</p>
               </div>
            )}
         </div>
      </>
   );
}

export default Attraction;
