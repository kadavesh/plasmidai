import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlasmid } from '../context/PlasmidContext';
import PlasmidVisualization from './PlasmidVisualization';
import SequenceAlignment from './SequenceAlignment';
import NewDesign from './NewDesign';
import Checkout from './Checkout';

const ResultsPanel = () => {
  const { 
    plasmids, 
    selectedPlasmids, 
    showAlignment, 
    showNewDesign, 
    newDesign,
    wizardState,
  } = usePlasmid();

  const selectedPlasmidData = plasmids.filter(p => selectedPlasmids.includes(p.id));
  const scrollRef = useRef(null);

  // Scroll to top when new content appears
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [wizardState.step]);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Results Header */}
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-bio-dark">Results & Visualization</h2>
        <p className="text-sm text-gray-600">
          {selectedPlasmidData.length > 0 
            ? `${selectedPlasmidData.length} plasmid${selectedPlasmids.length > 1 ? 's' : ''} selected`
            : 'No plasmids selected'
          }
        </p>
      </div>

      {/* Results Content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          {wizardState.step === 'start' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
              key="start"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                No Results Yet
              </h3>
              <p className="text-gray-500">
                Start a conversation with the AI to see plasmid visualizations, alignments, and designs here.
              </p>
            </motion.div>
          )}

          {/* Plasmid Visualizations */}
          {(wizardState.step === 'showPlasmids' || wizardState.step === 'selectPlasmid') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
              key="plasmids"
            >
              <h3 className="text-lg font-semibold text-bio-dark mb-4">Found {selectedPlasmidData.length} Plasmids</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {selectedPlasmidData.map((plasmid) => (
                  <PlasmidVisualization key={plasmid.id} plasmid={plasmid} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Sequence Alignment */}
          {wizardState.step === 'showAlignment' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
              key="alignment"
            >
              <SequenceAlignment />
            </motion.div>
          )}

          {/* New Design */}
          {wizardState.step === 'showDesign' && newDesign && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
              key="new-design"
            >
              <NewDesign design={newDesign} />
            </motion.div>
          )}

          {/* Checkout Section */}
          {(selectedPlasmids.length > 0 || showNewDesign) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              key="checkout"
            >
              <Checkout />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResultsPanel; 