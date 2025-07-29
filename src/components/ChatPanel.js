import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Bot, RotateCcw } from 'lucide-react';
import { usePlasmid } from '../context/PlasmidContext';
import DataSources from './DataSources';

const LinkerOptions = ({ data, onSelect }) => {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'From Your Company Inventory':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'From WayBio Parts Library':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'From Literature (Validated)':
        return 'text-purple-700 bg-purple-50 border-purple-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 mt-2 border border-gray-200">
      {Object.entries(data).map(([category, linkers]) => (
        <div key={category} className="mb-4 last:mb-0">
          <div className={`inline-block px-3 py-1 rounded-md border text-sm font-semibold mb-3 ${getCategoryColor(category)}`}>
            {category}
          </div>
          <div className="space-y-2">
            {linkers.map(linker => (
              <motion.div
                key={linker.value}
                whileHover={{ scale: 1.02, x: 2 }}
                onClick={() => onSelect(linker)}
                className="p-3 rounded-lg border cursor-pointer hover:border-bio-primary hover:bg-bio-light transition-all"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium text-bio-dark text-sm">{linker.name}</span>
                    <span className="ml-2 text-xs font-mono text-gray-500 bg-gray-100 px-1 py-0.5 rounded">{linker.value}</span>
                  </div>
                  <span className="text-xs text-gray-600 italic">{linker.description}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const Message = ({ message, onPlasmidSelect, onLinkerSelect }) => {
  const isUser = message.type === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-bio-primary ml-2' : 'bg-gray-200 mr-2'
        }`}>
          {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-gray-600" />}
        </div>
        <div className={`rounded-2xl px-4 py-2 ${
          isUser 
            ? 'bg-bio-primary text-white' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          <div className="whitespace-pre-wrap">{message.content}</div>
          {message.payload && message.payload.type === 'linkerOptions' && (
            <LinkerOptions 
              data={message.payload.data} 
              onSelect={onLinkerSelect}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ChatPanel = () => {
  const { 
    messages, 
    addMessage, 
    advanceDemoStep, 
    isWaitingForAnswer,
    activeSources,
    handleUserAction,
    runDemoSequence,
  } = usePlasmid();

  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isWaitingForAnswer) {
      addMessage({ type: 'user', content: input });
      setInput('');
    }
  };

  const handlePlasmidSelect = (plasmidId) => {
    handleUserAction('selectPlasmid', { plasmidId });
  };

  const handleLinkerSelect = (linker) => {
    handleUserAction('selectLinker', { linker });
  };

  const handleRestartDemo = () => {
    runDemoSequence();
    setTimeout(() => advanceDemoStep(), 100);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Chat Header */}
      <div className="border-b border-gray-200 p-4 bg-gray-50">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-bio-dark">AI Assistant</h2>
          <div className="flex space-x-2">
            <button
              onClick={advanceDemoStep}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
            >
              Next
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRestartDemo}
              className="flex items-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restart Demo</span>
            </motion.button>
          </div>
        </div>
        <DataSources activeSources={activeSources} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <Message 
            key={index} 
            message={message} 
            onPlasmidSelect={handlePlasmidSelect}
            onLinkerSelect={handleLinkerSelect}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isWaitingForAnswer}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bio-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!input.trim() || isWaitingForAnswer}
            className="px-4 py-2 bg-bio-primary text-white rounded-lg hover:bg-bio-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel; 