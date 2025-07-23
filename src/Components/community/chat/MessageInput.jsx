import { FiPaperclip } from 'react-icons/fi';
import { BsEmojiSmile } from 'react-icons/bs';
import { IoIosSend } from 'react-icons/io';

const MessageInput = () => {
  return (
    <div className="p-4 bg-white/20 backdrop-blur-2xl border-t border-white/20 flex items-center">
      <FiPaperclip className="text-xl text-gray-500 mx-2" />
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full bg-white/40 backdrop-blur-2xl rounded-full px-5 py-3 focus:outline-none text-sm border-2 border-white/40 focus:border-white/60 transition-all duration-200 shadow-lg"
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-white/5 -z-10 blur-2xl"></div>
      </div>
      <BsEmojiSmile className="text-xl text-gray-500 mx-2" />
      <IoIosSend className="text-2xl text-primarycolor mx-2 cursor-pointer" />
    </div>
  );
};

export default MessageInput;
