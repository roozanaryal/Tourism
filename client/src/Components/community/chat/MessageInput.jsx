import { FiPaperclip } from 'react-icons/fi';
import { BsEmojiSmile } from 'react-icons/bs';
import { IoIosSend } from 'react-icons/io';
import { useState } from 'react';
import useSendMessage from '../../../hooks/useSendMessage';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, loading } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // For community chat, we don't need a specific receiverId
    const result = await sendMessage(message);
    if (result) {
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 bg-white/20 backdrop-blur-2xl border-t border-white/20 flex items-center">
      <FiPaperclip className="text-xl text-gray-500 mx-2" />
      <div className="flex-1 relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="w-full bg-white/40 backdrop-blur-2xl rounded-full px-5 py-3 focus:outline-none text-sm border-2 border-white/40 focus:border-white/60 transition-all duration-200 shadow-lg"
          disabled={loading}
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-white/5 -z-10 blur-2xl"></div>
      </div>
      <BsEmojiSmile className="text-xl text-gray-500 mx-2" />
      <IoIosSend 
        className={`text-2xl ${loading ? 'text-gray-400' : 'text-primarycolor'} mx-2 cursor-pointer`} 
        onClick={handleSubmit}
      />
    </div>
  );
};

MessageInput.propTypes = {};

export default MessageInput;
