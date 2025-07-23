import { Card_Home } from "../Constants/Constant";

export default function CardHome() {
   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8 py-8">
         {Card_Home.map((card) => (
            <div
               key={card.id}
               className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] border border-gray-100"
            >
               <div className="relative overflow-hidden h-56">
                  <img
                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                     src={card.image}
                     alt={card.label}
                     loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                     <h3 className="text-white text-xl font-bold">{card.label}</h3>
                  </div>
               </div>
               <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors md:hidden">
                     {card.label}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                     {card.description}
                  </p>
                  <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center group-hover:underline">
                     Learn more
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                     </svg>
                  </button>
               </div>
            </div>
         ))}
      </div>
   );
}
