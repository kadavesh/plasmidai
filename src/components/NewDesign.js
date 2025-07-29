import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Download, Sparkles, Copy, Edit3 } from 'lucide-react';

const NewDesign = ({ design }) => {
  const [approved, setApproved] = useState(null);
  const [showSequence, setShowSequence] = useState(true);

  if (!design) {
    return null;
  }

  const formatSequence = (sequence) => {
    // Split sequence into groups of 10 for better readability
    const groups = [];
    for (let i = 0; i < sequence.length; i += 10) {
      groups.push(sequence.slice(i, i + 10));
    }
    return groups;
  };

  const copySequence = async () => {
    try {
      await navigator.clipboard.writeText(design.sequence);
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy sequence:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-bio-accent bg-opacity-10 rounded-lg">
            <Sparkles className="w-6 h-6 text-bio-accent" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-bio-dark">New Design Generated</h3>
            <p className="text-gray-600">AI-designed plasmid ready for review</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copySequence}
            className="flex items-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Copy className="w-4 h-4" />
            <span>Copy</span>
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

      {/* Design Details */}
      <div className="bg-gradient-to-r from-bio-light to-blue-50 rounded-lg p-4 mb-6">
        <h4 className="text-lg font-semibold text-bio-dark mb-2">{design.name}</h4>
        <p className="text-gray-700 mb-4">{design.description}</p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Length:</span>
            <span className="ml-2 font-medium">{design.sequence.length} bp</span>
          </div>
          <div>
            <span className="text-gray-600">Features:</span>
            <span className="ml-2 font-medium">{design.features.length}</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-bio-dark mb-3">Design Features</h4>
        <div className="space-y-2">
          {design.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: feature.color }}
                />
                <div>
                  <span className="font-medium text-bio-dark">{feature.name}</span>
                  <span className="ml-2 px-2 py-1 text-xs bg-white text-gray-600 rounded">
                    {feature.type}
                  </span>
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {feature.start}-{feature.end}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sequence Display */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-semibold text-bio-dark">Sequence</h4>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSequence(!showSequence)}
            className="text-sm text-bio-primary hover:text-bio-secondary transition-colors"
          >
            {showSequence ? 'Hide' : 'Show'} Sequence
          </motion.button>
        </div>
        
        {showSequence && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-gray-900 rounded-lg p-4 overflow-x-auto"
          >
            <div className="font-mono text-sm text-green-400 leading-relaxed">
              {formatSequence(design.sequence).map((group, groupIndex) => (
                <span key={groupIndex} className="mr-2">
                  {group.split('').map((nucleotide, nucIndex) => {
                    const absoluteIndex = groupIndex * 10 + nucIndex;
                    const isInFeature = design.features.some(feature => 
                      absoluteIndex >= feature.start - 1 && absoluteIndex < feature.end
                    );
                    
                    return (
                      <span
                        key={nucIndex}
                        className={isInFeature ? 'bg-yellow-600 bg-opacity-50' : ''}
                      >
                        {nucleotide}
                      </span>
                    );
                  })}
                  {(groupIndex + 1) % 5 === 0 && <br />}
                </span>
              ))}
            </div>
            
            {/* Position markers */}
            <div className="mt-2 font-mono text-xs text-gray-500">
              {Array.from({ length: Math.ceil(design.sequence.length / 50) }, (_, i) => (
                <span key={i} className="inline-block w-24">
                  {(i + 1) * 50}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Approval Section */}
      <div className="border-t pt-6">
        <h4 className="text-lg font-semibold text-bio-dark mb-4">Review & Approval</h4>
        
        {approved === null && (
          <div className="flex items-center justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setApproved(false)}
              className="flex items-center space-x-2 px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              <X className="w-5 h-5" />
              <span>Request Changes</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setApproved(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-bio-accent text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              <Check className="w-5 h-5" />
              <span>Approve Design</span>
            </motion.button>
          </div>
        )}

        {approved === true && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <div className="flex items-center justify-center space-x-2 text-green-700 mb-2">
              <Check className="w-6 h-6" />
              <span className="text-lg font-semibold">Design Approved!</span>
            </div>
            <p className="text-green-600 mb-4">
              Your custom plasmid design has been approved and is ready for synthesis.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-bio-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Proceed to Order
            </motion.button>
          </motion.div>
        )}

        {approved === false && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-orange-50 border border-orange-200 rounded-lg"
          >
            <div className="flex items-center space-x-2 text-orange-700 mb-2">
              <Edit3 className="w-5 h-5" />
              <span className="font-semibold">Changes Requested</span>
            </div>
            <p className="text-orange-600 mb-3">
              Please specify what changes you'd like to make to this design.
            </p>
            <textarea
              placeholder="Describe the changes you'd like..."
              className="w-full p-3 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bio-primary focus:border-transparent"
              rows="3"
            />
            <div className="flex justify-end space-x-2 mt-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setApproved(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-bio-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Submit Changes
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default NewDesign; 