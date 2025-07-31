import baseURL from "../Constants/baseURL"
const useBookGuide = () => {
  const bookGuide = async (guideName, userEmail) => {
    const token = localStorage.getItem("neptour-token");
    try {
      const res = await fetch(`${baseURL}/bookguide/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ guideName, userEmail }),
        credentials: 'include', // ensure cookies/session are sent
      });
      const text = await res.text();
      if (!res.ok) {
        let errorMessage = text;
        try {
          const errorData = JSON.parse(text);
          errorMessage = errorData.message || 'Booking failed';
        } catch {
          // If not JSON (likely HTML), keep text as error
          if (text.startsWith('<!DOCTYPE')) {
            errorMessage = 'Server error or route not found.';
          }
        }
        throw new Error(errorMessage);
      }
      try {
        return JSON.parse(text);
      } catch {
        throw new Error('Invalid server response.');
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return { bookGuide };
};

export default useBookGuide;