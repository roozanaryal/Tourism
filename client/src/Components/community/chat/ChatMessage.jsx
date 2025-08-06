
import PropTypes from 'prop-types';

const ChatMessage = ({ avatar, name, time, message, isSender }) => {
  return (
    <div className={`flex items-start gap-2 my-2 ${isSender ? 'justify-end' : ''}`}>
      {!isSender && (
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-bold text-white text-sm">
          {avatar}
        </div>
      )}
      <div className={`flex flex-col ${isSender ? 'items-end' : 'items-start'}`}>
        <div className="flex items-center gap-2">
          {!isSender && <span className="font-semibold text-sm">{name}</span>}
          <span className="text-xs text-gray-400">{time}</span>
          {isSender && <span className="font-semibold text-sm">You</span>}
        </div>
        <div className={`mt-1 p-2 rounded-lg max-w-[80%] text-sm ${isSender ? 'bg-primarycolor text-white' : 'bg-gray-200'}`}>
          {message}
        </div>
      </div>
      {isSender && (
        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold text-white text-sm">
          Y
        </div>
      )}
    </div>
  );
};

ChatMessage.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  isSender: PropTypes.bool.isRequired,
};

export default ChatMessage;
