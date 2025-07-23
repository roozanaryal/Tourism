export const mockMessages = [
    {
      id: '1',
      user: 'Alice Johnson',
      message: 'Hey everyone! How\'s your day going?',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      isOwnMessage: false,
    },
    {
      id: '2',
      user: 'Bob Smith',
      message: 'Pretty good! Just finished a big project at work. What about you?',
      timestamp: new Date(Date.now() - 1000 * 60 * 12),
      isOwnMessage: false,
    },
    {
      id: '3',
      user: 'You',
      message: 'That\'s awesome Bob! I\'m just relaxing and catching up on some reading.',
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      isOwnMessage: true,
    },
    {
      id: '4',
      user: 'Charlie Brown',
      message: 'Anyone want to grab coffee later? I know a great place downtown.',
      timestamp: new Date(Date.now() - 1000 * 60 * 8),
      isOwnMessage: false,
    },
    {
      id: '5',
      user: 'Diana Prince',
      message: 'I\'d love to join! What time were you thinking?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      isOwnMessage: false,
    },
    {
      id: '6',
      user: 'You',
      message: 'Count me in too! I could use some caffeine ☕',
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
      isOwnMessage: true,
    },
  ];
  
  export const mockUsers = [
    { id: '1', name: 'Alice Johnson', status: 'online' },
    { id: '2', name: 'Bob Smith', status: 'away' },
    { id: '3', name: 'Charlie Brown', status: 'online' },
    { id: '4', name: 'Diana Prince', status: 'online' },
    { id: '5', name: 'Eve Wilson', status: 'busy' },
    { id: '6', name: 'Frank Miller', status: 'online' },
    { id: '7', name: 'Grace Lee', status: 'away' },
    { id: '8', name: 'Henry Davis', status: 'online' },
  ];