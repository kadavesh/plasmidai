import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Download, CheckCircle } from 'lucide-react';
import { usePlasmid } from '../context/PlasmidContext';

const PlasmidVisualization = ({ plasmid }) => {
  const { wizardState, handleUserAction } = usePlasmid();
  const [selectedFeature, setSelectedFeature] = useState(null);

  // Calculate positions for features on the circle
  const radius = 80;
  const centerX = 100;
  const centerY = 100;

  const getFeatureArc = (feature) => {
    const startAngle = (feature.start / plasmid.length) * 2 * Math.PI - Math.PI / 2;
    const endAngle = (feature.end / plasmid.length) * 2 * Math.PI - Math.PI / 2;
    
    const startX = centerX + radius * Math.cos(startAngle);
    const startY = centerY + radius * Math.sin(startAngle);
    const endX = centerX + radius * Math.cos(endAngle);
    const endY = centerY + radius * Math.sin(endAngle);
    
    const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";
    
    return {
      path: `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      startAngle,
      endAngle,
      midAngle: (startAngle + endAngle) / 2
    };
  };

  const getFeaturePosition = (feature) => {
    const arc = getFeatureArc(feature);
    const labelRadius = radius + 25;
    const x = centerX + labelRadius * Math.cos(arc.midAngle);
    const y = centerY + labelRadius * Math.sin(arc.midAngle);
    return { x, y };
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-bio-dark">{plasmid.name}</h3>
          <p className="text-sm text-gray-600">{plasmid.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          {wizardState.step === 'selectPlasmid' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleUserAction('selectPlasmid', { plasmidId: plasmid.id })}
              className="flex items-center space-x-2 px-3 py-1 bg-bio-accent text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm"
            >
              <CheckCircle className="w-4 h-4" />
              Select
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-gray-400 hover:text-bio-primary transition-colors"
          >
            <Eye className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-gray-400 hover:text-bio-primary transition-colors"
          >
            <Download className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Plasmid Circle Visualization */}
      <div className="flex items-center justify-center mb-4">
        <svg width="200" height="200" className="plasmid-circle">
          {/* Main circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="2"
          />
          
          {/* Features */}
          {plasmid.features.map((feature, index) => {
            const arc = getFeatureArc(feature);
            return (
              <g key={index}>
                <path
                  d={arc.path}
                  fill="none"
                  stroke={feature.color}
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="cursor-pointer transition-opacity hover:opacity-75"
                  onClick={() => setSelectedFeature(feature)}
                />
              </g>
            );
          })}
          
          {/* Feature labels */}
          {plasmid.features.map((feature, index) => {
            const pos = getFeaturePosition(feature);
            return (
              <g key={`label-${index}`}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="3"
                  fill={feature.color}
                />
                <text
                  x={pos.x}
                  y={pos.y - 8}
                  textAnchor="middle"
                  className="text-xs font-medium fill-gray-700"
                >
                  {feature.name}
                </text>
              </g>
            );
          })}
          
          {/* Center info */}
          <text
            x={centerX}
            y={centerY - 5}
            textAnchor="middle"
            className="text-sm font-semibold fill-bio-dark"
          >
            {plasmid.length} bp
          </text>
          <text
            x={centerX}
            y={centerY + 10}
            textAnchor="middle"
            className="text-xs fill-gray-600"
          >
            circular
          </text>
        </svg>
      </div>

      {/* Features List */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700 flex items-center">
          <CheckCircle className="w-4 h-4 mr-1" />
          Features ({plasmid.features.length})
        </h4>
        <div className="space-y-1">
          {plasmid.features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedFeature(feature)}
              className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                selectedFeature?.name === feature.name 
                  ? 'bg-bio-light border border-bio-secondary' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: feature.color }}
                />
                <span className="text-sm font-medium">{feature.name}</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {feature.type}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {feature.start}-{feature.end}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex flex-wrap gap-1">
          {plasmid.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-bio-light text-bio-primary rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Selected Feature Details */}
      {selectedFeature && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-gray-50 rounded-lg border-l-4"
          style={{ borderLeftColor: selectedFeature.color }}
        >
          <h5 className="font-medium text-gray-900">{selectedFeature.name}</h5>
          <p className="text-sm text-gray-600 capitalize">{selectedFeature.type}</p>
          <p className="text-xs text-gray-500 mt-1">
            Position: {selectedFeature.start} - {selectedFeature.end} ({selectedFeature.end - selectedFeature.start + 1} bp)
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PlasmidVisualization; 