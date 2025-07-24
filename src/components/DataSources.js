import React from 'react';
import { motion } from 'framer-motion';
import { Database, Globe, BookOpen, Bot } from 'lucide-react';

const DataSources = ({ activeSources = [] }) => {
  const sources = [
    {
      id: 'inventory',
      name: 'User Inventory',
      description: 'Your plasmid collection',
      icon: Database,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700'
    },
    {
      id: 'waybio',
      name: 'WayBio Parts',
      description: 'Commercial part library',
      icon: Globe,
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700'
    },
    {
      id: 'knowledge',
      name: 'Biology Knowledge',
      description: 'Scientific literature & data',
      icon: BookOpen,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700'
    },
    {
      id: 'ai-design',
      name: 'AI-based Design',
      description: 'Intelligent synthesis & optimization',
      icon: Bot,
      color: 'bg-orange-500',
      lightColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700'
    }
  ];

  const topRowSources = sources.slice(0, 3);
  const aiDesignSource = sources[3];

  const SourceBox = ({ source, index, isTopRow = true }) => {
    const isActive = activeSources.includes(source.id);
    const IconComponent = source.icon;
    
    return (
      <motion.div
        key={source.id}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.1)'
        }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className={`
          ${isTopRow ? 'flex-1' : 'w-64'} p-3 rounded-lg border-2 transition-all duration-300
          ${isActive 
            ? `${source.lightColor} ${source.borderColor} shadow-md transform scale-105` 
            : 'bg-gray-50 border-gray-200 opacity-60'
          }
        `}
      >
        <div className="flex items-center space-x-2">
          <div className={`
            p-1.5 rounded-md
            ${isActive ? source.color : 'bg-gray-400'}
          `}>
            <IconComponent className="w-3 h-3 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className={`
              text-xs font-semibold truncate
              ${isActive ? source.textColor : 'text-gray-500'}
            `}>
              {source.name}
            </div>
            <div className={`
              text-xs truncate
              ${isActive ? 'text-gray-600' : 'text-gray-400'}
            `}>
              {source.description}
            </div>
          </div>
        </div>
        
        {isActive && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`h-0.5 ${source.color} rounded-full mt-2 origin-left`}
          />
        )}
      </motion.div>
    );
  };

  return (
    <div className="mt-4 mb-2">
      <div className="text-xs text-gray-500 mb-2 font-medium">Data Sources Used:</div>
      
      {/* Top row - Three main sources */}
      <div className="flex space-x-2 mb-2">
        {topRowSources.map((source, index) => (
          <SourceBox key={source.id} source={source} index={index} isTopRow={true} />
        ))}
      </div>
      
      {/* Bottom row - AI Design centered */}
      <div className="flex justify-center">
        <SourceBox source={aiDesignSource} index={3} isTopRow={false} />
      </div>
    </div>
  );
};

export default DataSources; 