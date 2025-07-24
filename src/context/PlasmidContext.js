import React, { createContext, useContext, useState } from 'react';

const PlasmidContext = createContext();

export const usePlasmid = () => {
  const context = useContext(PlasmidContext);
  if (!context) {
    throw new Error('usePlasmid must be used within a PlasmidProvider');
  }
  return context;
};

// Mock plasmid data
const mockPlasmids = [
  {
    id: 1,
    name: "pMYC-001",
    description: "High expression MYC vector with CMV promoter",
    sequence: "ATGCCCCTCAACGTTAGCTTCACCAACAGGAACTATGACCTCGACTACGACTCGGTGCAGCCGTATTTCTCCTTCTTCCTCGACC",
    length: 5847,
    features: [
      { name: "MYC", start: 1240, end: 1572, type: "gene", color: "#ff6b6b" },
      { name: "CMV Promoter", start: 890, end: 1190, type: "promoter", color: "#4ecdc4" },
      { name: "AmpR", start: 2100, end: 2960, type: "resistance", color: "#45b7d1" },
    ],
    tags: ["MYC", "CMV", "High Expression"],
    company: "BioTech Corp"
  },
  {
    id: 2,
    name: "pMYC-FLAG-002",
    description: "MYC with N-terminal FLAG tag",
    sequence: "ATGGACTACAAAGACGATGACGACAAGCCCCTCAACGTTAGCTTCACCAACAGGAACTATGACCTCGACTACGACTCGGTGCAGCC",
    length: 5923,
    features: [
      { name: "FLAG Tag", start: 1240, end: 1264, type: "tag", color: "#95e1d3" },
      { name: "MYC", start: 1265, end: 1597, type: "gene", color: "#ff6b6b" },
      { name: "CMV Promoter", start: 890, end: 1190, type: "promoter", color: "#4ecdc4" },
      { name: "AmpR", start: 2150, end: 3010, type: "resistance", color: "#45b7d1" },
    ],
    tags: ["MYC", "FLAG", "Tagged"],
    company: "BioTech Corp"
  },
  {
    id: 3,
    name: "pMYC-HIS-003",
    description: "MYC with C-terminal His tag",
    sequence: "ATGCCCCTCAACGTTAGCTTCACCAACAGGAACTATGACCTCGACTACGACTCGGTGCAGCCGCACCACCACCACCACCACTAG",
    length: 5901,
    features: [
      { name: "MYC", start: 1240, end: 1572, type: "gene", color: "#ff6b6b" },
      { name: "His Tag", start: 1573, end: 1596, type: "tag", color: "#ffeaa7" },
      { name: "CMV Promoter", start: 890, end: 1190, type: "promoter", color: "#4ecdc4" },
      { name: "AmpR", start: 2120, end: 2980, type: "resistance", color: "#45b7d1" },
    ],
    tags: ["MYC", "His", "Purification"],
    company: "BioTech Corp"
  },
  {
    id: 4,
    name: "pBASE-007",
    description: "Base vector with partial sequence match",
    sequence: "ATGCCGCTGAAGTCGGCCATCGTGGAGTACGACCACGGCCGCATCAAGACCTTCGAGCGCTACGGCAAG",  
    length: 4200,
    features: [
      { name: "Partial Match", start: 1, end: 30, type: "gene", color: "#ff9800" },
      { name: "Origin", start: 3500, end: 4000, type: "origin", color: "#2196f3" },
      { name: "AmpR", start: 2500, end: 3400, type: "resistance", color: "#45b7d1" },
    ],
    tags: ["Base", "Partial", "Assembly"],
    company: "BioTech Corp"
  }
];

const demoConversations = {
  demo1: [
    { type: 'user', content: 'Do I have a plasmid that contains the gene MYC?' },
    { 
      type: 'ai', 
      content: 'Yes, I found 3 plasmids in your inventory that contain the MYC gene. Let me show you the details:', 
      plasmids: [1, 2, 3],
      showPlasmids: true
    },
    { type: 'user', content: 'What is the difference between them?' },
    { 
      type: 'ai', 
      content: 'Great question! Let me perform a sequence alignment to show you the key differences between these MYC plasmids:', 
      showAlignment: true,
      alignmentData: {
        sequences: [
          { name: "pMYC-001", seq: "ATGCCCCTCAACGTTAGCTTCACCAACAGGAACTATGACCTCGACTACGACTCGGTGCAGCCGTATTTCTCCTTCTTCCTCGACC" },
          { name: "pMYC-FLAG-002", seq: "ATGGACTACAAAGACGATGACGACAAGCCCCTCAACGTTAGCTTCACCAACAGGAACTATGACCTCGACTACGACTCGGTGCAGCC" },
          { name: "pMYC-HIS-003", seq: "ATGCCCCTCAACGTTAGCTTCACCAACAGGAACTATGACCTCGACTACGACTCGGTGCAGCCGCACCACCACCACCACCACTAG" }
        ],
        differences: [
          "pMYC-FLAG-002 has an N-terminal FLAG tag for detection",
          "pMYC-HIS-003 has a C-terminal His tag for purification",
          "pMYC-001 is the untagged wild-type version"
        ]
      }
    },
    { type: 'user', content: 'Can you help me design a new variation?' },
    { type: 'ai', content: 'Absolutely! I\'d be happy to help you create a new variation. What type of modification would you like to make to the MYC plasmid?' },
    { type: 'user', content: 'I want to add a FLAG tag to it.' },
    { type: 'ai', content: 'Excellent choice! FLAG tags are great for detection and purification. Let me ask - would you prefer the FLAG tag at the N-terminus or C-terminus?' },
    { type: 'user', content: 'N-terminus please' },
    { 
      type: 'ai', 
      content: 'Perfect! I\'ve designed a new MYC plasmid with an N-terminal FLAG tag. Here\'s your custom design:', 
      newDesign: {
        name: "pMYC-FLAG-Custom",
        sequence: "ATGGACTACAAAGACGATGACGACAAGCCCCTCAACGTTAGCTTCACCAACAGGAACTATGACCTCGACTACGACTCGGTGCAGCCGTATTTCTCCTTCTTCCTCGACC",
        features: [
          { name: "FLAG Tag", start: 1, end: 24, type: "tag", color: "#95e1d3" },
          { name: "MYC", start: 25, end: 357, type: "gene", color: "#ff6b6b" }
        ],
        description: "Custom MYC with N-terminal FLAG tag for enhanced detection"
      },
      showDesign: true
    }
  ],

  demo2: [
    { type: 'user', content: 'Does this sequence exist in my inventory?\n\nATGCCGCTGAAGTCGGCCATCGTGGAGTACGACCTGCAGGCGATCAAGACCTTCGAGCGCTAC' },
    { 
      type: 'ai', 
      content: 'I\'ve analyzed your sequence! Part of this sequence exists in your library in plasmid pBASE-007, but another part exists in our WayBio Parts library. Do you want me to create a new plasmid combining these elements?', 
      plasmids: [4],
      showPlasmids: true
    },
    { type: 'user', content: 'Yes! But I also need to select a promoter for it.' },
    { type: 'ai', content: 'Sure! What type of promoter are you thinking? What cell type will you be working with?' },
    { type: 'user', content: 'Maybe a promoter that strongly expresses in HEK293 cells.' },
    { 
      type: 'ai', 
      content: 'Perfect choice! For strong expression in HEK293 cells, I suggest CMV or EF1-alpha promoters. These are shown in publications (Chen et al. 2018, Nature Methods) to be strongly expressed in HEK293 cells. CMV tends to be slightly stronger but can be silenced over time, while EF1-alpha provides more stable long-term expression.'
    },
    { type: 'user', content: 'That sounds good! Let\'s go with CMV.' },
    { 
      type: 'ai', 
      content: 'Excellent! I\'ve designed your custom plasmid with CMV promoter and the combined sequence elements. Here\'s your design:', 
      newDesign: {
        name: "pCMV-Custom-001",
        sequence: "GTTGACATTGATTATTGACTAGTTATTAATAGTAATCAATTACGGGGTCATTAGTTCATAGCCCATATATGGAGTTCCGCGTTACATAACTTACGGTAAATGGCCCGCCTGGCTGACCGCCCAACGACCCCCGCCCATTGACGTCAATAATGACGTATGTTCCCATAGTAACGCCAATAGGGACTTTCCATTGACGTCAATGGGTGGAGTATTTACGGTAAACTGCCCACTTGGCAGTACATCAAGTGTATCATATGCCAAGTACGCCCCCTATTGAC",
        features: [
          { name: "CMV Promoter", start: 1, end: 150, type: "promoter", color: "#4ecdc4" },
          { name: "Your Sequence", start: 151, end: 213, type: "gene", color: "#ff6b6b" },
          { name: "WayBio Part", start: 214, end: 280, type: "part", color: "#95e1d3" }
        ],
        description: "Custom plasmid with CMV promoter driving your sequence combined with WayBio parts"
      },
      showDesign: true
    }
  ],

  demo3: [
    { type: 'user', content: 'I want to express a fluorescent protein in my cells. Can you help me select one?' },
    { type: 'ai', content: 'Absolutely! I can help you select the perfect fluorescent protein. What application do you want to use it for?' },
    { type: 'user', content: 'For microscopy experiments.' },
    { type: 'ai', content: 'Great! What light filters do you have available on your microscope setup?' },
    { type: 'user', content: 'I have green and red filters available.' },
    { 
      type: 'ai', 
      content: 'Perfect! Based on your filter setup, I suggest mCherry (red) or mNeonGreen (green). mCherry is very bright and photostable for red channel imaging, while mNeonGreen is one of the brightest green fluorescent proteins available. Both work excellently for microscopy. Which would you prefer?'
    },
    { type: 'user', content: 'Let\'s go with mCherry for the red channel.' },
    { 
      type: 'ai', 
      content: 'Excellent choice! mCherry is perfect for microscopy with red filters. I\'ve designed a plasmid with mCherry under a strong promoter. Here\'s your fluorescent protein expression vector:', 
      newDesign: {
        name: "pCMV-mCherry-001",
        sequence: "ATGGTGAGCAAGGGCGAGGAGGATAACATGGCCATCATCAAGGAGTTCATGCGCTTCAAGGTGCACATGGAGGGCTCCGTGAACGGCCACGAGTTCGAGATCGAGGGCGAGGGCGAGGGCCGCCCCTACGAGGGCACCCAGACCGCCAAGCTGAAGGTGACCAAGGGTGGCCCCCTGCCCTTCGCCTGGGACATCCTGTCCCCTCAGTTCATGTACGGCTCCAAGGCCTACGTGAAGCACCCCGCCGACATCCCCGACTACTTGAAGCTGTCCTTCCCCGAGGGCTTCAAGTGGGAGCGCGTGATGAACTTCGAGGACGGCGGCGTGGTGACCGTGACCCAGGACTCCTCCCTGCAGGACGGCGAGTTCATCTACAAGGTGAAGCTGCGCGGCACCAACTTCCCCTCCGACGGCCCCGTAATGCAGAAGAAGACCATGGGCTGGGAGGCCTCCTCCGAGCGGATGTACCCCGAGGACGGCGCCCTGAAGGGCGAGATCAAGCAGAGGCTGAAGCTGAAGGACGGCGGCCACTACGACGCTGAGGTCAAGACCACCTACAAGGCCAAGAAGCCCGTGCAGCTGCCCGGCGCCTACAACGTCAACATCAAGTTGGACATCACCTCCCACAACGAGGACTACACCATCGTGGAACAGTACGAACGCGCCGAGGGCCGCCACTCCACCGGCGGCATGGACGAGCTGTACAAGTAA",
        features: [
          { name: "CMV Promoter", start: 1, end: 150, type: "promoter", color: "#4ecdc4" },
          { name: "mCherry", start: 151, end: 864, type: "fluorescent_protein", color: "#ff1744" },
          { name: "Stop Codon", start: 865, end: 867, type: "terminator", color: "#9e9e9e" }
        ],
        description: "mCherry fluorescent protein expression vector optimized for microscopy with red filters"
      },
      showDesign: true
    }
  ]
};

export const PlasmidProvider = ({ children }) => {
  const [plasmids] = useState(mockPlasmids);
  const [selectedPlasmids, setSelectedPlasmids] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showAlignment, setShowAlignment] = useState(false);
  const [showNewDesign, setShowNewDesign] = useState(false);
  const [newDesign, setNewDesign] = useState(null);
  const [isWaitingForAnswer, setIsWaitingForAnswer] = useState(false);
  const [currentDemo, setCurrentDemo] = useState(null);
  const [showDemoSelector, setShowDemoSelector] = useState(true);

  const addMessage = (message) => {
    setMessages(prev => [...prev, { ...message, id: Date.now() }]);
  };

  const selectPlasmid = (plasmidId) => {
    setSelectedPlasmids(prev => 
      prev.includes(plasmidId) 
        ? prev.filter(id => id !== plasmidId)
        : [...prev, plasmidId]
    );
  };

  const selectDemo = (demoType) => {
    setCurrentDemo(demoType);
    setShowDemoSelector(false);
    setMessages([]);
    setCurrentStep(0);
    setShowAlignment(false);
    setShowNewDesign(false);
    setSelectedPlasmids([]);
    setNewDesign(null);
    setIsWaitingForAnswer(false);
  };

  const backToDemo = () => {
    setShowDemoSelector(true);
    setCurrentDemo(null);
    setMessages([]);
    setCurrentStep(0);
    setShowAlignment(false);
    setShowNewDesign(false);
    setSelectedPlasmids([]);
    setNewDesign(null);
    setIsWaitingForAnswer(false);
  };

  const runDemoSequence = () => {
    if (!currentDemo) return;
    setMessages([]);
    setCurrentStep(0);
    setShowAlignment(false);
    setShowNewDesign(false);
    setSelectedPlasmids([]);
    setNewDesign(null);
    setIsWaitingForAnswer(false);
  };

  const advanceDemoStep = () => {
    if (!currentDemo || currentStep >= demoConversations[currentDemo].length) return;
    
    const msg = demoConversations[currentDemo][currentStep];
      
      // Add the message
      setMessages(prev => [...prev, { ...msg, id: Date.now() + currentStep }]);
      
      // If this is a user message, set up auto-answer
      if (msg.type === 'user' && currentStep + 1 < demoConversations[currentDemo].length) {
        setIsWaitingForAnswer(true);
        setCurrentStep(currentStep + 1);
        
        // Auto-show the AI response after 2 seconds
        setTimeout(() => {
          const nextMsg = demoConversations[currentDemo][currentStep + 1];
          if (nextMsg && nextMsg.type === 'ai') {
            setMessages(prev => [...prev, { ...nextMsg, id: Date.now() + currentStep + 1 }]);
            
            // Handle special actions for AI response - trigger visuals immediately
            if (nextMsg.showPlasmids) {
              // Show plasmids immediately when AI response appears
              setSelectedPlasmids(nextMsg.plasmids);
            }
            if (nextMsg.showAlignment) {
              // Show alignment immediately when AI response appears
              setShowAlignment(true);
            }
            if (nextMsg.showDesign) {
              // Show design immediately when AI response appears
              setNewDesign(nextMsg.newDesign);
              setShowNewDesign(true);
            }
            
            setCurrentStep(currentStep + 2);
            setIsWaitingForAnswer(false);
          }
        }, 2000);
      } else {
        // For standalone AI messages (shouldn't happen in current demo flow)
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const value = {
    plasmids,
    selectedPlasmids,
    messages,
    currentStep,
    showAlignment,
    showNewDesign,
    newDesign,
    isWaitingForAnswer,
    currentDemo,
    showDemoSelector,
    addMessage,
    selectPlasmid,
    setCurrentStep,
    runDemoSequence,
    advanceDemoStep,
    selectDemo,
    backToDemo,
    demoConversations
  };

  return (
    <PlasmidContext.Provider value={value}>
      {children}
    </PlasmidContext.Provider>
  );
}; 