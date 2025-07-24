import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Play, RefreshCw, ArrowLeft } from 'lucide-react';
import { usePlasmid } from '../context/PlasmidContext';
import DemoSelector from './DemoSelector';

const ChatPanel = () => {
  const { 
    messages, 
    addMessage, 
    runDemoSequence, 
    advanceDemoStep, 
    currentStep, 
    demoConversations, 
    isWaitingForAnswer, 
    currentDemo, 
    showDemoSelector,
    backToDemo 
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
        </div>
      </div>
    </motion.div>
  );

  if (showDemoSelector) {
    return <DemoSelector />;
  }

  return (
    <div className="h-full flex flex-col bg-bio-light">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={backToDemo}
              className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </motion.button>
            <div>
              <h2 className="text-lg font-semibold text-bio-dark">AI Assistant</h2>
              <p className="text-sm text-gray-600">
                {currentDemo === 'demo1' && 'Inventory Search & Design Demo'}
                {currentDemo === 'demo2' && 'Sequence Assembly Demo'}
                {currentDemo === 'demo3' && 'Fluorescent Protein Selection Demo'}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            {currentStep === 0 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={runDemoSequence}
                className="flex items-center space-x-2 px-4 py-2 bg-bio-accent text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>Next</span>
              </motion.button>
            ) : isWaitingForAnswer ? (
              <motion.button
                disabled
                className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg opacity-75 cursor-not-allowed"
              >
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>AI Responding...</span>
              </motion.button>
            ) : currentStep < demoConversations[currentDemo]?.length ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={advanceDemoStep}
                className="flex items-center space-x-2 px-4 py-2 bg-bio-secondary text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>Next ({Math.floor(currentStep/2) + 1}/{Math.ceil(demoConversations[currentDemo]?.length/2)})</span>
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={runDemoSequence}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset Demo</span>
              </motion.button>
            )}
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
          {messages.length === 0 && currentDemo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Bot className="w-12 h-12 text-bio-primary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-bio-dark mb-2">
                {currentDemo === 'demo1' && 'Inventory Search & Design'}
                {currentDemo === 'demo2' && 'Sequence Assembly'}
                {currentDemo === 'demo3' && 'Fluorescent Protein Selection'}
              </h3>
              <p className="text-gray-600 mb-6">
                {currentDemo === 'demo1' && 'Search your plasmid inventory, compare sequences, and design new variants.'}
                {currentDemo === 'demo2' && 'Paste sequences to find matches and combine parts from multiple libraries.'}
                {currentDemo === 'demo3' && 'Design expression vectors with optimal fluorescent proteins for microscopy.'}
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