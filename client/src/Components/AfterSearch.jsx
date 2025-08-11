import { FaStar } from "react-icons/fa";
import PropTypes from "prop-types";

// Dropdown suggestions panel to render under the search input (Google-like)
export default function AfterSearch({ suggestions = [], loading = false, error = null, onSelect = () => {} }) {
  const renderHighlighted = (txt, query) => {
    const q = query.trim();
    if (!q) return txt;
    const lt = txt.toLowerCase();
    const lq = q.toLowerCase();
    const idx = lt.indexOf(lq);
    if (idx === -1) return txt;
    const before = txt.slice(0, idx);
    const match = txt.slice(idx, idx + q.length);
    const after = txt.slice(idx + q.length);
    return (
      <>
        {before}
        <span className="font-semibold">{match}</span>
        {after}
      </>
    );
  };

  if (loading) {
    return (
      <div className="absolute left-0 right-0 mt-2 z-50">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <ul className="max-h-96 overflow-auto">
            <li className="px-4 py-3 text-gray-500 text-sm">Loading...</li>
          </ul>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute left-0 right-0 mt-2 z-50">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <ul className="max-h-96 overflow-auto">
            <li className="px-4 py-3 text-red-500 text-sm">Error: {error}</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute left-0 right-0 mt-2 z-50">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* List */}
        <ul className="max-h-96 overflow-auto">
          {suggestions.length === 0 && !loading && (
            <li className="px-4 py-3 text-gray-500 text-sm">No results</li>
          )}
          {suggestions.map((item, idx) => (
            <li
              key={idx}
              className="px-4 py-3 flex items-center gap-4 cursor-pointer hover:bg-gray-50"
              onMouseDown={(e) => {
                // onMouseDown to avoid blur closing before click
                e.preventDefault();
                onSelect(item.name);
              }}
            >
              {/* Left: thumbnail */}
              <img
                src={item.image}
                alt={item.name}
                className="h-12 w-12 rounded-md object-cover border border-gray-200"
                loading="lazy"
              />

              {/* Middle: name + rating/reviews + blurb */}
              <div className="flex-1 min-w-0">
                <div className="text-[15px] text-gray-900 font-medium truncate">{renderHighlighted(item.name, item.query || "")}</div>
                <div className="mt-0.5 flex items-center gap-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span>{item.review || item.rating}</span>
                  </span>
                  <span>•</span>
                  <span>{item.reviews} reviews</span>
                </div>
                <div className="text-[13px] text-gray-500 truncate">{item.blurb || "Beautiful place to visit"}</div>
              </div>

              {/* Right: Explore more button */}
              <button
                className="shrink-0 px-3 py-1.5 rounded-full bg-primarycolor text-white text-sm hover:bg-primarycolor/90"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSelect(item.name);
                }}
              >
                Explore more
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

AfterSearch.propTypes = {
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      review: PropTypes.number,
      rating: PropTypes.number,
      reviews: PropTypes.number,
      blurb: PropTypes.string,
      query: PropTypes.string,
    })
  ),
  loading: PropTypes.bool,
  error: PropTypes.string,
  onSelect: PropTypes.func,
};