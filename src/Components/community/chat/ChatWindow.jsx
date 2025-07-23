import ChatMessage from './ChatMessage';

const ChatWindow = () => {
  const messages = [
    { avatar: 'A', name: 'Alice Johnson', time: '15m ago', message: 'Hey everyone! How\'s your day going?', isSender: false },
    { avatar: 'B', name: 'Bob Smith', time: '12m ago', message: 'Pretty good! Just finished a big project at work. What about you?', isSender: false },
    { avatar: 'Y', name: 'You', time: '10m ago', message: 'That\'s awesome Bob! I\'m just relaxing and catching up on some reading.', isSender: true },
    { avatar: 'C', name: 'Charlie Brown', time: '8m ago', message: 'Anyone want to grab coffee later? I know a great place downtown.', isSender: false },
    { avatar: 'D', name: 'Diana Prince', time: '5m ago', message: 'I\'d love to join! What time were you thinking?', isSender: false },
    { avatar: 'Y', name: 'You', time: '3m ago', message: 'Count me in too! I could use some caffeine ☕️', isSender: true },
  ];

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-white/10 backdrop-blur-sm scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent scrollbar-thumb-rounded-full">
      {messages.map((msg, index) => (
        <ChatMessage key={index} {...msg} />
      ))}
    </div>
  );
};

export default ChatWindow;
