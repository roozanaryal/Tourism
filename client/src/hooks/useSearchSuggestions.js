import { useState, useCallback } from "react";
import { Card_Home } from "../Constants/Constant";

// Default image if place not found
const DEFAULT_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/512px-Placeholder_view_vector.svg.png";

// Hook to fetch search suggestions with prefix prioritization
export function useSearchSuggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch suggestions from backend API
  const fetchSuggestions = useCallback(async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Actual API call to backend
      const API_BASE = import.meta?.env?.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`, { credentials: "include" });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();

      // Merge backend data with hardcoded images and additional info
      const lowerQuery = query.toLowerCase();
      const enrichedResults = data.map((item) => {
        // Find matching constant for image
        const match = Card_Home.find((c) =>
          (c.label || "").toLowerCase() === (item.placename || "").toLowerCase()
        );
        
        return {
          name: item.placename,
          image: match ? match.image : DEFAULT_IMAGE,
          review: item.review || 4.5, // Use backend review if available
          reviews: Math.floor(Math.random() * 200) + 50, // Mock reviews count
          blurb: match ? match.description : "Beautiful place to visit",
          query: query, // Pass query for highlighting
        };
      });

      // Sort: prefix matches first
      const sortedResults = enrichedResults.sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(lowerQuery) ? 0 : 1;
        const bStarts = b.name.toLowerCase().startsWith(lowerQuery) ? 0 : 1;
        if (aStarts !== bStarts) return aStarts - bStarts;
        return a.name.localeCompare(b.name);
      });

      setSuggestions(sortedResults);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setError(err.message || "Failed to fetch suggestions");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { suggestions, loading, error, fetchSuggestions };
}
