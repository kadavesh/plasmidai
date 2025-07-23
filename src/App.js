import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ChatPanel from './components/ChatPanel';
import ResultsPanel from './components/ResultsPanel';
import Header from './components/Header';
import Login from './components/Login';
import { PlasmidProvider } from './context/PlasmidContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <PlasmidProvider>
      <div className="h-screen flex flex-col bg-bio-light">
        <Header />
        <div className="flex-1 flex overflow-hidden">
          <motion.div 
            className="w-1/2 border-r border-gray-200"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ChatPanel />
          </motion.div>
          <motion.div 
            className="w-1/2"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ResultsPanel />
          </motion.div>
        </div>
      </div>
    </PlasmidProvider>
  );
}

export default App; 