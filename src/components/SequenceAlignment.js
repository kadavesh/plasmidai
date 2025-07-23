import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlignLeft, Download, Eye, ChevronDown, ChevronUp } from 'lucide-react';

const SequenceAlignment = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedDifference, setSelectedDifference] = useState(0);

  // Mock alignment data
  const alignmentData = {
    sequences: [
      { 
        name: "pMYC-001", 
        seq: "ATGCCCCTCAACGTTAGCTTCACCAACAGGAACTATGACCTCGACTACGACTCGGTGCAGCCGTATTTCTCCTTCTTCCTCGACC",
        type: "reference"
      },
      { 
        name: "pMYC-FLAG-002", 
        seq: "ATGGACTACAAAGACGATGACGACAAGCCCCTCAACGTTAGCTTCACCAACAGGAACTATGACCTCGACTACGACTCGGTGCAGCC",
        type: "variant"
      },
      { 
        name: "pMYC-HIS-003", 
        seq: "ATGCCCCTCAACGTTAGCTTCACCAACAGGAACTATGACCTCGACTACGACTCGGTGCAGCCGCACCACCACCACCACCACTAG",
        type: "variant"
      }
    ],
    differences: [
      {
        position: 4,
        description: "pMYC-FLAG-002 has an N-terminal FLAG tag (DYKDDDDK) insertion",
        sequences: ["---", "GACTACAAAGACGATGACGACAAG", "---"],
        type: "insertion"
      },
      {
        position: 72,
        description: "pMYC-HIS-003 has a C-terminal His tag (HHHHHH) insertion", 
        sequences: ["GTATTTCTCCTTCTTCCTCGACC", "GTATTTCTCCTTCTTCCTCGACC", "GCACCACCACCACCACCACTAG"],
        type: "insertion"
      }
    ]
  };

  const getSequenceWithHighlights = (sequence, seqIndex) => {
    const chars = sequence.split('');
    const differences = alignmentData.differences;
    
    return chars.map((char, index) => {
      const isDifferent = differences.some(diff => 
        index >= diff.position && index < diff.position + diff.sequences[seqIndex].length &&
        diff.sequences[seqIndex] !== diff.sequences[0]
      );
      
      return (
        <span
          key={index}
          className={`font-mono text-sm ${
            isDifferent ? 'bg-yellow-200 text-yellow-800' : 'text-gray-700'
          }`}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <AlignLeft className="w-5 h-5 text-bio-primary" />
          <h3 className="text-lg font-semibold text-bio-dark">Sequence Alignment</h3>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setExpanded(!expanded)}
            className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span>{expanded ? 'Collapse' : 'Expand'}</span>
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

      {/* Summary */}
      <div className="mb-4 p-3 bg-bio-light rounded-lg">
        <h4 className="font-medium text-bio-dark mb-2">Alignment Summary</h4>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Sequences:</span>
            <span className="ml-2 font-medium">{alignmentData.sequences.length}</span>
          </div>
          <div>
            <span className="text-gray-600">Length:</span>
            <span className="ml-2 font-medium">~{alignmentData.sequences[0].seq.length} bp</span>
          </div>
          <div>
            <span className="text-gray-600">Differences:</span>
            <span className="ml-2 font-medium">{alignmentData.differences.length}</span>
          </div>
        </div>
      </div>

      {/* Key Differences */}
      <div className="mb-4">
        <h4 className="font-medium text-bio-dark mb-3">Key Differences</h4>
        <div className="space-y-2">
          {alignmentData.differences.map((diff, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.01 }}
              onClick={() => setSelectedDifference(index)}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedDifference === index 
                  ? 'border-bio-primary bg-bio-light' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-bio-dark">
                    Position {diff.position}
                  </span>
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    diff.type === 'insertion' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {diff.type}
                  </span>
                </div>
                <Eye className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mt-1">{diff.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sequence View */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t pt-4"
        >
          <h4 className="font-medium text-bio-dark mb-3">Sequence Alignment</h4>
          <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
            <div className="space-y-3">
              {alignmentData.sequences.map((seq, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-32 flex-shrink-0">
                    <span className="text-sm font-medium text-bio-dark">
                      {seq.name}
                    </span>
                    <span className={`ml-2 px-2 py-1 text-xs rounded ${
                      seq.type === 'reference' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {seq.type}
                    </span>
                  </div>
                  <div className="flex-1 break-all">
                    {getSequenceWithHighlights(seq.seq, index)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Position ruler */}
          <div className="mt-2 flex items-start space-x-4">
            <div className="w-32 flex-shrink-0"></div>
            <div className="flex-1 text-xs text-gray-500 font-mono">
              {Array.from({ length: Math.ceil(alignmentData.sequences[0].seq.length / 10) }, (_, i) => (
                <span key={i} className="inline-block w-20">
                  {(i + 1) * 10}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Selected Difference Detail */}
      {selectedDifference !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-white border border-bio-primary rounded-lg"
        >
          <h5 className="font-medium text-bio-dark mb-2">
            Difference at Position {alignmentData.differences[selectedDifference].position}
          </h5>
          <div className="space-y-2">
            {alignmentData.sequences.map((seq, index) => (
              <div key={index} className="flex items-center space-x-3">
                <span className="w-24 text-sm font-medium">{seq.name}:</span>
                <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">
                  {alignmentData.differences[selectedDifference].sequences[index] || '---'}
                </code>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SequenceAlignment; 