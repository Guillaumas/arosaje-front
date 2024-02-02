// App.tsx
import React, { useState } from 'react';
import Sidebar from './Messaging/Sidebar';
import Conversation from './Messaging/Conversation';
import './App.css';

const App: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<any>({}); // Initialisez avec une valeur par défaut

  return (
    <div>
      <Sidebar isConversationSelected={selectedConversation !== null} />
      <Conversation selectedConversation={selectedConversation} />
    </div>
  );
};

export default App;