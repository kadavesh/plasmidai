import React from 'react';
import { motion } from 'framer-motion';
import { Search, Dna, Microscope, Play } from 'lucide-react';
import { usePlasmid } from '../context/PlasmidContext';

const DemoSelector = () => {
  const { selectDemo } = usePlasmid();

  const demos = [
    {
      id: 'demo1',
      title: 'Inventory Search & Design',
      description: 'Search existing plasmid inventory, compare sequences, and design custom variants',
      icon: Search,
      color: 'bg-blue-500',
      features: ['Plasmid search', 'Sequence alignment', 'Custom tagging', 'Order placement'],
      example: 'Find MYC plasmids, compare differences, add FLAG tag'
    },
    {
      id: 'demo2', 
      title: 'Sequence Assembly',
      description: 'Paste sequences to find matches and combine parts from multiple libraries',
      icon: Dna,
      color: 'bg-green-500',
      features: ['Sequence analysis', 'Library matching', 'Promoter selection', 'Part assembly'],
      example: 'Paste sequence, find partial matches, combine with promoter'
    },
    {
      id: 'demo3',
      title: 'Fluorescent Protein Selection',
      description: 'Design expression vectors with optimal fluorescent proteins for microscopy',
      icon: Microscope,
      color: 'bg-purple-500',
      features: ['Protein selection', 'Filter compatibility', 'Expression optimization', 'Vector design'],
      example: 'Select mCherry for red channel microscopy imaging'
    }
  ];

  return (
    <div className="h-full flex flex-col bg-bio-light">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-bio-dark mb-2">PlasmidAI Demo Center</h1>
          <p className="text-gray-600 text-lg">
            Choose a demo to explore different AI-powered plasmid design workflows
          </p>
        </div>
      </div>

      {/* Demo Cards */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {demos.map((demo, index) => (
              <motion.div
                key={demo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Card Header */}
                <div className={`${demo.color} p-6 text-white`}>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                      <demo.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">{demo.title}</h3>
                  </div>
                  <p className="text-white text-opacity-90">{demo.description}</p>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-bio-dark mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {demo.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-bio-accent rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Example */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-bio-dark mb-2">Example Workflow:</h4>
                    <p className="text-sm text-gray-600 italic">"{demo.example}"</p>
                  </div>

                  {/* Start Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => selectDemo(demo.id)}
                    className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg text-white font-semibold transition-all group-hover:shadow-lg ${demo.color} hover:opacity-90`}
                  >
                    <Play className="w-5 h-5" />
                    <span>Start Demo</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-bio-dark mb-2">
                Interactive Prototype
              </h3>
              <p className="text-gray-600">
                Each demo showcases different capabilities of our AI-powered plasmid design platform. 
                Click through the conversations to see real-time visualizations and design workflows.
              </p>
              <div className="flex items-center justify-center space-x-6 mt-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-bio-accent rounded-full"></div>
                  <span>Step-by-step demos</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-bio-secondary rounded-full"></div>
                  <span>Real-time visualizations</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-bio-primary rounded-full"></div>
                  <span>Complete workflows</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DemoSelector; 