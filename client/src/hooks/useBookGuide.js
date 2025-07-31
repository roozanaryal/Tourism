import baseURL from "../Constants/baseURL"
const useBookGuide = () => {
  const bookGuide = async (guideName, userEmail) => {
    try {
      const res = await fetch(`${baseURL}/guidebooking/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guideName, userEmail }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Booking failed');
      }
      return await res.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return { bookGuide };
};

export default useBookGuide;