import { useEffect, useState, useCallback, useRef } from 'react';
import ChatMessage from './ChatMessage';
import useGetMessage from '../../../hooks/useGetMessage';
import { useSocketContext } from '../../../hooks/useSocketContext';

const ChatWindow = () => {
  const { messages: backendMessages, loading, getMessage } = useGetMessage();
  const [formattedMessages, setFormattedMessages] = useState([]);
  const socketContext = useSocketContext();
  const socket = socketContext?.socket;
  const lastFetchTime = useRef(0);
  const chatContainerRef = useRef(null);

  // Create a stable version of getMessage
  const stableGetMessage = useCallback(() => {
    // Prevent too frequent requests
    const now = Date.now();
    if (now - lastFetchTime.current < 1000) {
      return;
    }
    lastFetchTime.current = now;
    
    getMessage();
  }, [getMessage]);

  // Function to add a new message to the local state
  const addMessageToLocalState = useCallback((newMessage) => {
    setFormattedMessages(prevMessages => {
      // Check if message already exists to prevent duplicates
      // We check both the message ID and a combination of sender, message content, and timestamp
      const messageExists = prevMessages.some(msg => 
        msg.id === newMessage._id || 
        (msg.name === (newMessage.sender?.username || 'Unknown User') && 
         msg.message === newMessage.message && 
         newMessage.createdAt && 
         Math.abs(new Date(msg.time).getTime() - new Date(newMessage.createdAt).getTime()) < 5000)
      );
      
      if (messageExists) return prevMessages;
      
      // Format the new message
      const currentUser = JSON.parse(localStorage.getItem('neptour-user')) || {};
      const isSender = newMessage.sender?._id === currentUser._id;
      
      const messageTime = newMessage.createdAt 
        ? new Date(newMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : 'Just now';
      
      const formattedMessage = {
        id: newMessage._id,
        avatar: newMessage.sender?.username ? newMessage.sender.username.charAt(0).toUpperCase() : 'U',
        name: newMessage.sender?.username || 'Unknown User',
        time: messageTime,
        message: newMessage.message,
        isSender: isSender
      };
      
      return [...prevMessages, formattedMessage];
    });
  }, []);

  // Fetch messages only once when component mounts
  useEffect(() => {
    stableGetMessage();
  }, [stableGetMessage]);

  useEffect(() => {
    if (socket) {
      // Listen for new messages
      const handleMessageReceive = (newMessage) => {
        // Add the new message to local state immediately
        addMessageToLocalState(newMessage);
        
        // Also fetch all messages to maintain consistency (with delay)
        setTimeout(() => {
          stableGetMessage();
        }, 1000);
      };

      socket.on('receiveMessage', handleMessageReceive);

      return () => {
        socket.off('receiveMessage', handleMessageReceive);
      };
    }
  }, [socket, stableGetMessage, addMessageToLocalState]);

  useEffect(() => {
    if (Array.isArray(backendMessages)) {
      const formatted = backendMessages.map((msg) => {
        // Get current user from localStorage
        const currentUser = JSON.parse(localStorage.getItem('neptour-user')) || {};
        const isSender = msg.sender && msg.sender._id === currentUser._id;
        
        // Format time
        const messageTime = msg.createdAt 
          ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : 'Just now';
        
        return {
          id: msg._id || Math.random(), // Add the actual message ID or fallback
          avatar: msg.sender && msg.sender.username 
            ? msg.sender.username.charAt(0).toUpperCase() 
            : 'U',
          name: msg.sender && msg.sender.username || 'Unknown User',
          time: messageTime,
          message: msg.message || '',
          isSender: isSender
        };
      });
      setFormattedMessages(formatted);
    } else {
      setFormattedMessages([]);
    }
  }, [backendMessages]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    // Always scroll to bottom when new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [formattedMessages]);

  if (loading) {
    return (
      <div className="flex-1 p-4 overflow-y-auto bg-white/10 backdrop-blur-sm scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent scrollbar-thumb-rounded-full flex items-center justify-center">
        <div className="text-white">Loading messages...</div>
      </div>
    );
  }

  return (
    <div 
      ref={chatContainerRef}
      className="flex-1 p-4 overflow-y-auto bg-white/10 backdrop-blur-sm scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent scrollbar-thumb-rounded-full"
    >
      {formattedMessages.length > 0 ? (
        formattedMessages.map((msg) => (
          <ChatMessage key={msg.id} {...msg} />
        ))
      ) : (
        <div className="flex-1 flex items-center justify-center text-white/70">
          No messages yet. Be the first to send a message!
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
