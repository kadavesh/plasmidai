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
      description: "Standard MYC expression vector",
      length: 5400,
      features: [
        { name: "MYC", start: 100, end: 1400, type: "gene", color: "#ff6b6b" },
        { name: "CMV Promoter", start: 10, end: 80, type: "promoter", color: "#4ecdc4" },
        { name: "AmpR", start: 2000, end: 2900, type: "resistance", color: "#45b7d1" },
        { name: "pA", start: 1500, end: 1600, type: "terminator", color: "#feca57" }
      ],
      tags: ["MYC", "Backbone"],
      company: "BioTech Corp"
    },
    {
      id: 2,
      name: "pMYC-FLAG-002",
      description: "N-terminal FLAG-tagged MYC",
      length: 5424,
      features: [
        { name: "FLAG", start: 100, end: 124, type: "tag", color: "#95e1d3" },
        { name: "MYC", start: 125, end: 1524, type: "gene", color: "#ff6b6b" },
        { name: "CMV Promoter", start: 10, end: 80, type: "promoter", color: "#4ecdc4" },
        { name: "AmpR", start: 2100, end: 3000, type: "resistance", color: "#45b7d1" }
      ],
      tags: ["MYC", "FLAG", "N-term"],
      company: "BioTech Corp"
    },
    {
      id: 3,
      name: "pMYC-HIS-003",
      description: "C-terminal His-tagged MYC",
      length: 5418,
      features: [
        { name: "MYC", start: 100, end: 1400, type: "gene", color: "#ff6b6b" },
        { name: "His-Tag", start: 1401, end: 1418, type: "tag", color: "#95e1d3" },
        { name: "AmpR", start: 2000, end: 2900, type: "resistance", color: "#45b7d1" }
      ],
      tags: ["MYC", "His", "C-term"],
      company: "BioTech Corp"
    }
  ];
  
  const cas9Plasmids = [
    {
      id: 5,
      name: "pCas9-Plain",
      description: "Standard Cas9 expression vector",
      length: 9100,
      features: [
        { name: "Cas9", start: 100, end: 4200, type: "gene", color: "#ff6b6b" },
        { name: "CMV Promoter", start: 10, end: 80, type: "promoter", color: "#4ecdc4" },
        { name: "AmpR", start: 5000, end: 5900, type: "resistance", color: "#45b7d1" },
      ],
      tags: ["Cas9", "Standard"],
      company: "BioTech Corp"
    },
    {
      id: 6,
      name: "pCas9-GFP",
      description: "Cas9 fused to eGFP for visualization",
      length: 9800,
      features: [
        { name: "Cas9", start: 100, end: 4200, type: "gene", color: "#ff6b6b" },
        { name: "eGFP", start: 4201, end: 4900, type: "tag", color: "#4caf50" },
        { name: "CMV Promoter", start: 10, end: 80, type: "promoter", color: "#4ecdc4" },
      ],
      tags: ["Cas9", "GFP", "Fusion"],
      company: "BioTech Corp"
    },
    {
      id: 7,
      name: "pCas9-3xNLS",
      description: "Cas9 with enhanced nuclear localization",
      length: 9150,
      features: [
        { name: "3xNLS", start: 100, end: 150, type: "nls", color: "#ff9800" },
        { name: "Cas9", start: 151, end: 4250, type: "gene", color: "#ff6b6b" },
      ],
      tags: ["Cas9", "NLS", "Enhanced"],
      company: "BioTech Corp"
    },
    {
      id: 8,
      name: "pCas9-FLAG",
      description: "Cas9 with N-terminal FLAG tag",
      length: 9124,
      features: [
        { name: "FLAG", start: 100, end: 124, type: "tag", color: "#95e1d3" },
        { name: "Cas9", start: 125, end: 4224, type: "gene", color: "#ff6b6b" },
      ],
      tags: ["Cas9", "FLAG", "Tagged"],
      company: "BioTech Corp"
    },
    {
      id: 9,
      name: "pSpCas9-2A-Puro",
      description: "Streptococcus pyogenes Cas9 with Puromycin resistance",
      length: 9400,
      features: [
        { name: "SpCas9", start: 100, end: 4200, type: "gene", color: "#ff6b6b" },
        { name: "PuroR", start: 4500, end: 5100, type: "resistance", color: "#f44336" },
      ],
      tags: ["Cas9", "Puromycin", "SpCas9"],
      company: "BioTech Corp"
    },
    {
      id: 10,
      name: "pCas9-SV40NLS",
      description: "Cas9 with a standard SV40 NLS",
      length: 9121,
      features: [
        { name: "SV40 NLS", start: 4170, end: 4191, type: "nls", color: "#ff9800" },
        { name: "Cas9", start: 100, end: 4169, type: "gene", color: "#ff6b6b" },
      ],
      tags: ["Cas9", "SV40", "NLS"],
      company: "BioTech Corp"
    }
];

export const PlasmidProvider = ({ children }) => {
  const [plasmids] = useState([...mockPlasmids, ...cas9Plasmids]);
  const [selectedPlasmids, setSelectedPlasmids] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showAlignment, setShowAlignment] = useState(false);
  const [showNewDesign, setShowNewDesign] = useState(false);
  const [newDesign, setNewDesign] = useState(null);
  const [isWaitingForAnswer, setIsWaitingForAnswer] = useState(false);
  const [wizardState, setWizardState] = useState({
    step: 'start', // start, showPlasmids, selectPlasmid, showAlignment, offerModification, selectLinker, showDesign
    selectedPlasmidId: null,
    selectedLinker: null
  });

  const addMessage = (message, payload = null) => {
    const newMsg = { ...message, id: Date.now() };
    if (payload) {
      newMsg.payload = payload;
    }
    setMessages(prev => [...prev, newMsg]);
  };

  const runDemoSequence = () => {
    setMessages([]);
    setShowAlignment(false);
    setShowNewDesign(false);
    setSelectedPlasmids([]);
    setNewDesign(null);
    setIsWaitingForAnswer(false);
    setWizardState({
      step: 'start',
      selectedPlasmidId: null,
      selectedLinker: null
    });
  };

  const advanceDemoStep = () => {
    // This is the central controller for the interactive demo
    setIsWaitingForAnswer(true);

    // Simulate AI thinking time
    setTimeout(() => {
        const currentUserMsg = { type: 'user', content: '' };
        const nextAIMsg = { type: 'ai', content: '', dataSources: [] };

        let nextStep = wizardState.step;
        
        switch (wizardState.step) {
            case 'start':
                currentUserMsg.content = "Do I have a gene called Cas9 in my inventory?";
                addMessage(currentUserMsg);

                setTimeout(() => {
                    nextAIMsg.content = "Yes, I found 6 plasmids with the Cas9 gene. Here they are.";
                    nextAIMsg.dataSources = ['inventory'];
                    setSelectedPlasmids([5, 6, 7, 8, 9, 10]);
                    nextStep = 'showPlasmids';
                    addMessage(nextAIMsg);
                    setWizardState(prev => ({ ...prev, step: nextStep }));
                    setIsWaitingForAnswer(false);
                }, 1500);
                return; // early return to handle async message adding
            
            case 'showPlasmids':
              currentUserMsg.content = "What are the differences between them?";
              addMessage(currentUserMsg);
    
              setTimeout(() => {
                nextAIMsg.content = "Here's an alignment of the core Cas9 regions. The main variations are tags and nuclear localization signals (NLS).\n\nSelect a plasmid to use as a base for your new cloning project.";
                nextAIMsg.dataSources = ['inventory', 'knowledge'];
                addMessage(nextAIMsg);
                setShowAlignment(true);
                setWizardState(prev => ({ ...prev, step: 'selectPlasmid' }));
                setIsWaitingForAnswer(false);
              }, 1500);
              return;

            case 'offerModification':
                currentUserMsg.content = "I want to add a linker and a GFP gene to the Cas9. What linker should I use?";
                addMessage(currentUserMsg);

                setTimeout(() => {
                    nextAIMsg.content = "Great choice! Adding GFP will allow you to visualize Cas9 localization. I've found some linker options that work well for Cas9-GFP fusions. Please choose a linker to connect Cas9 and GFP:";
                    nextAIMsg.dataSources = ['inventory', 'waybio', 'knowledge'];
                    const payload = {
                      type: 'linkerOptions',
                      data: {
                        'From Your Company Inventory': [
                            { name: 'Standard Flexible (GGGGS)x3', value: 'GGGGSGGGGSGGGGS', description: 'High flexibility, 15 aa length. Example: GFP-Cas9 fusions' },
                            { name: 'Ultra-Flexible (GGGGS)x4', value: 'GGGGSGGGGSGGGGSGGGGS', description: 'Maximum flexibility, 20 aa length. Example: Multi-domain proteins' },
                            { name: 'Rigid Alpha-Helical (EAAAK)x3', value: 'EAAAKEAAAKEAAAK', description: 'Maintains domain separation, 15 aa. Example: Antibody engineering' },
                        ],
                        'From WayBio Parts Library': [
                            { name: 'Short Glycine-Serine (GS)x5', value: 'GSGSGSGSGS', description: 'Minimal flexible linker, 10 aa. Example: scFv constructs' },
                            { name: 'Proline-Rich Semi-Rigid (AP)x6', value: 'APAPAPAPAPAP', description: 'Semi-rigid structure, 12 aa. Example: Enzyme fusions' },
                            { name: 'Long Flexible (GGGGS)x6', value: 'GGGGSGGGGSGGGGSGGGGSGGGGSGGGS', description: 'Extended flexibility, 30 aa. Example: Large domain fusions' },
                        ],
                        'From Literature (Validated)': [
                            { name: 'TEV Protease Cleavable', value: 'ENLYFQSGGGGS', description: 'Cleavable linker with TEV site. Example: Purification tags' },
                            { name: 'Thrombin Cleavable', value: 'LVPRGSGGGGS', description: 'Thrombin cleavage site + flexible. Example: Protein purification' },
                            { name: 'Compact Rigid (PAPAP)x3', value: 'PAPAPPAPAPPAPAP', description: 'Compact rigid structure, 15 aa. Example: Structural proteins' },
                        ]
                      }
                    };
                    addMessage(nextAIMsg, payload);
                    setWizardState(prev => ({...prev, step: 'selectLinker'}));
                    setIsWaitingForAnswer(false);
                }, 1500);
                return;

            default:
                // Handles steps that are only advanced by user interaction
                setIsWaitingForAnswer(false);
                return;
        }

    }, 500);
  };
  
  const handleUserAction = (action, payload) => {
    setIsWaitingForAnswer(true);

    if (action === 'selectPlasmid') {
        const { plasmidId } = payload;
        const selected = plasmids.find(p => p.id === plasmidId);
        
        // This check prevents crash if plasmid not found
        if (!selected) {
            console.error("Selected plasmid not found:", plasmidId);
            setIsWaitingForAnswer(false);
            return;
        }
        
        setWizardState(prev => ({ ...prev, step: 'offerModification', selectedPlasmidId: plasmidId }));
        addMessage({ type: 'user', content: `Great, I'll select ${selected.name} for my new cloning project.` });
      
        // Visually select only this one
        setSelectedPlasmids([plasmidId]);
        setShowAlignment(false); // Hide alignment view

        setTimeout(() => {
            const aiMessage = {
              type: 'ai',
              content: `Excellent choice. ${selected.name} is a great starting point. What would you like to do with it?`,
              dataSources: ['knowledge']
            };
            addMessage(aiMessage);
            setIsWaitingForAnswer(false);
        }, 1500);
    }

    if (action === 'selectLinker') {
        const { linker } = payload;
        const basePlasmid = plasmids.find(p => p.id === wizardState.selectedPlasmidId);

        if (!basePlasmid) {
            console.error("CRASH AVERTED: Could not find base plasmid for design. Wizard state:", wizardState);
            addMessage({ type: 'ai', content: "Sorry, an error occurred and I lost track of the selected plasmid. Could you please restart the demo?" });
            setIsWaitingForAnswer(false);
            return;
        }

        addMessage({ type: 'user', content: `I'll use the ${linker.name}.` });

        setTimeout(() => {
            const newPlasmid = {
                name: `${basePlasmid.name}-${linker.name.split(' ')[0]}-GFP`,
                description: `New design: ${basePlasmid.name} fused to GFP using a ${linker.name} for visualization.`,
                length: basePlasmid.length + (linker.value.length * 3) + 720, // Approx length change including GFP
                features: [
                    ...basePlasmid.features,
                    { name: `Linker (${linker.name})`, start: 4201, end: 4201 + linker.value.length, type: 'linker', color: '#ff9800' },
                    { name: 'GFP', start: 4201 + linker.value.length, end: 4201 + linker.value.length + 720, type: 'fluorescent', color: '#4ade80' },
                ],
                tags: [...basePlasmid.tags, 'GFP', 'Fluorescent', 'Custom-Design'],
                sequence: `ATGAAGATCCTGAAAGACCTGCAGGATGACATGAAAGAGCTGCAGACCTACGAGAAGATGCTGCAGCTGAAGGACCTGCAG${linker.value}ATGGTGAGCAAGGGCGAGGAGCTGTTCACCGGGGTGGTGCCCATCCTGGTCGAGCTGGACGGCGACGTAAACGGCCACAAGTTCAGCGTGTCCGGCGAGGGCGAGGGCGATGCCACCTACGGCAAGCTGACCCTGAAGTTCATCTGCACCACCGGCAAGCTGCCCGTGCCCTGGCCCACCCTCGTGACCACCCTGACCTACGGCGTGCAGTGCTTCAGCCGCTACCCCGACCACATGAAGCAGCACGACTTCTTCAAGTCCGCCATGCCCGAAGGCTACGTCCAGGAGCGCACCATCTTCTTCAAGGACGACGGCAACTACAAGACCCGCGCCGAGGTGAAGTTCGAGGGCGACACCCTGGTGAACCGCATCGAGCTGAAGGGCATCGACTTCAAGGAGGACGGCAACATCCTGGGGCACAAGCTGGAGTACAACTACAACAGCCACAACGTCTATATCATGGCCGACAAGCAGAAGAACGGCATCAAGGTGAACTTCAAGATCCGCCACAACATCGAGGACGGCAGCGTGCAGCTCGCCGACCACTACCAGCAGAACACCCCCATCGGCGACGGCCCCGTGCTGCTGCCCGACAACCACTACCTGAGCACCCAGTCCGCCCTGAGCAAAGACCCCAACGAGAAGCGCGATCACATGGTCCTGCTGGAGTTCGTGACCGCCGCCGGGATCACTCTCGGCATGGACGAGCTGTACAAGTAG`
            };
            setNewDesign(newPlasmid);
            setShowNewDesign(true);
            setSelectedPlasmids([]);
            
            const aiMessage = {
                type: 'ai',
                content: `Perfect! I've generated the new Cas9-GFP fusion plasmid **${newPlasmid.name}**. The ${linker.name} provides optimal spacing between Cas9 and GFP for proper folding and fluorescence. You can see the updated design with both the linker and GFP gene on the right. Does this look correct?`,
                dataSources: ['inventory', 'waybio', 'ai-design']
            };
            addMessage(aiMessage);
            setWizardState(prev => ({ ...prev, step: 'showDesign', selectedLinker: linker }));
            setIsWaitingForAnswer(false);
        }, 1500);
    }
  };

  const value = {
    plasmids,
    selectedPlasmids,
    messages,
    showAlignment,
    showNewDesign,
    newDesign,
    isWaitingForAnswer,
    wizardState,
    addMessage,
    runDemoSequence,
    advanceDemoStep,
    handleUserAction,
  };

  return (
    <PlasmidContext.Provider value={value}>
      {children}
    </PlasmidContext.Provider>
  );
}; 