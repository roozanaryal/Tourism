import { FaSearch } from "react-icons/fa";
import { useState, useRef } from "react";
import AfterSearch from "./AfterSearch";
import { useSearchSuggestions } from "../hooks/useSearchSuggestions";

export default function Search() {
   const [searchQuery, setSearchQuery] = useState("");
   const [open, setOpen] = useState(false);
   const blurTimeout = useRef(null);
   const { suggestions, loading, error, fetchSuggestions } = useSearchSuggestions();

   const handleSearch = (e) => {
      e.preventDefault();
      if (!searchQuery.trim()) return;
      // keep dropdown open for now; wire real action later
      setOpen(true);
   };

   const handleFocus = () => {
      if (blurTimeout.current) clearTimeout(blurTimeout.current);
      const hasText = !!searchQuery.trim();
      setOpen(hasText);
      if (hasText) {
         fetchSuggestions(searchQuery);
      }
   };

   const handleBlur = () => {
      blurTimeout.current = setTimeout(() => setOpen(false), 120);
   };

   const handleSelect = (text) => {
      setSearchQuery(text);
      setOpen(false);
   };

   const handleChange = (e) => {
      const value = e.target.value;
      setSearchQuery(value);
      const hasText = !!value.trim();
      setOpen(hasText);

      // Debounce the API call
      if (blurTimeout.current) clearTimeout(blurTimeout.current);
      blurTimeout.current = setTimeout(() => {
         if (hasText) {
            fetchSuggestions(value);
         } else {
            // No text: ensure dropdown is closed
            setOpen(false);
         }
      }, 300);
   };

   return (
      <div className="relative">
         <form onSubmit={handleSearch} className="relative" autoComplete="off">
            <input
               type="text"
               value={searchQuery}
               onChange={handleChange}
               onFocus={handleFocus}
               onBlur={handleBlur}
               placeholder="Find Your Next Adventure....."
               className="z-10 p-3 mt-4 px-10 outline-none w-[550px] rounded-full bg-transparent bg-white bg-opacity-30 text-white border-none placeholder:text-white placeholder:font-bold"
            />
            <button type="submit" className="absolute top-7 right-5 text-primarycolor">
               <FaSearch className="text-2xl" />
            </button>
         </form>

         {open && (
            <AfterSearch 
               suggestions={suggestions} 
               loading={loading} 
               error={error} 
               onSelect={handleSelect} 
            />
         )}
      </div>
   );
}
