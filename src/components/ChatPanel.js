import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Play, RefreshCw, Eye, Download, Tag, CheckCircle } from 'lucide-react';
import { usePlasmid } from '../context/PlasmidContext';
import DataSources from './DataSources';

const PlasmidVisualization = ({ plasmid }) => {
  const { handleSelectPlasmid, wizardState } = usePlasmid();
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <div className="bg-white rounded-lg p-4 mt-2">
      <h4 className="font-semibold text-bio-dark mb-2">Select a Linker:</h4>
      <div className="space-y-2">
        {linkers.map(linker => (
          <motion.div
            key={linker.value}
            whileHover={{ scale: 1.02 }}
            onClick={() => onSelect(linker)}
            className="p-3 rounded-lg border cursor-pointer hover:border-bio-primary hover:bg-bio-light transition-all"
          >
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium text-bio-dark">{linker.name}</span>
                <span className="ml-2 text-xs text-gray-500">{linker.value}</span>
              </div>
              <span className="text-sm text-gray-600">{linker.description}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ChatPanel = () => {
  const { 
    messages, 
    addMessage, 
    runDemoSequence, 
    advanceDemoStep, 
    isWaitingForAnswer,
  } = usePlasmid();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      addMessage({ type: 'user', content: inputText });
      setInputText('');
      
      // Simulate AI typing
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage({ 
          type: 'ai', 
          content: 'I understand your request. Let me analyze this for you...' 
        });
      }, 1500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const TypingIndicator = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center space-x-2 p-4 mb-4"
    >
      <div className="w-8 h-8 bg-bio-secondary rounded-full flex items-center justify-center">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </motion.div>
  );

  const Message = ({ message }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${message.type === 'user' ? 'justify-end' : 'flex-start'} mb-4`}
    >
      <div className={`flex items-start space-x-2 max-w-[80%] ${
        message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
      }`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          message.type === 'user' 
            ? 'bg-bio-primary' 
            : 'bg-bio-secondary'
        }`}>
          {message.type === 'user' ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-white" />
          )}
        </div>
        <div className={`rounded-lg px-4 py-2 shadow-sm border ${
          message.type === 'user' 
            ? 'bg-bio-primary text-white border-bio-primary' 
            : 'bg-white text-gray-800 border-gray-200'
        }`}>
          <p className="whitespace-pre-wrap">{message.content}</p>
          {message.type === 'ai' && message.dataSources && (
            <DataSources activeSources={message.dataSources} />
          )}
          {message.payload}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="h-full flex flex-col bg-bio-light">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-bio-dark">AI Assistant</h2>
              <p className="text-sm text-gray-600">
                Interactive Cas9 Design Demo
              </p>
            </div>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={advanceDemoStep}
              className="flex items-center space-x-2 px-4 py-2 bg-bio-secondary text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>Next</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Bot className="w-12 h-12 text-bio-primary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-bio-dark mb-2">
                Interactive Cas9 Design
              </h3>
              <p className="text-gray-600 mb-6">
                This demo will walk you through searching for Cas9, comparing variants, and designing a new one.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  runDemoSequence();
                  setTimeout(() => advanceDemoStep(), 100);
                }}
                className="px-6 py-3 bg-bio-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Start Demo
              </motion.button>
            </motion.div>
          )}
          
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          
          {(isTyping || isWaitingForAnswer) && <TypingIndicator />}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about your plasmids..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-bio-primary focus:border-transparent"
              rows="2"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="p-2 bg-bio-primary text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel; 