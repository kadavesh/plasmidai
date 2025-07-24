import React from 'react';
import { motion } from 'framer-motion';
import { Dna, Beaker } from 'lucide-react';

const Header = () => {
  return (
    <motion.header 
      className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-bio-primary rounded-lg">
            <Dna className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-bio-dark">WayBio A&I Powered Design®</h1>
            <p className="text-sm text-gray-600">Intelligent Plasmid Design Platform</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Beaker className="w-4 h-4" />
            <span>BioTech Corp</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-bio-accent rounded-full animate-pulse"></div>
            <span className="text-bio-accent font-medium">Live Demo</span>
          </div>
          <div className="w-8 h-8 bg-bio-secondary rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">BC</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header; 