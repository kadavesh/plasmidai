# PlasmidAI - Biotech CRO Plasmid Design Platform

A beautiful mockup application for a biotech CRO focused on assembly and cloning of plasmids. This prototype demonstrates an AI-powered chat interface for plasmid inventory management and custom design workflows.

## Features

### 🧬 AI-Powered Plasmid Search
- Natural language queries to search plasmid inventory
- Intelligent matching of gene names and annotations
- Real-time chat interface with typing indicators

### 🔬 Visual Plasmid Representation
- Interactive circular plasmid maps
- Color-coded feature annotations
- Detailed feature information and positioning

### 📊 Sequence Alignment
- Visual comparison of multiple plasmids
- Highlighted differences and insertions
- Expandable sequence viewer with position markers

### ⚡ Custom Design Generation
- AI-assisted plasmid modification
- Tag insertion and custom modifications
- Sequence preview with feature highlighting
- Approval workflow for designs

### 🛒 Integrated Ordering System
- Complete checkout flow
- Multiple delivery options (Standard, Expedited, Urgent)
- Format selection (DNA, Glycerol Stock)
- Order confirmation and tracking

## Demo Workflow

The application demonstrates this complete user journey:

1. **User asks**: "Do I have a plasmid that contains the gene MYC?"
2. **AI responds**: Shows 3 matching plasmids with visualizations
3. **User asks**: "What is the difference between them?"
4. **AI shows**: Detailed sequence alignment highlighting differences
5. **User requests**: "Help me make a new variation with a FLAG tag"
6. **AI designs**: Custom plasmid with FLAG tag insertion
7. **User approves**: Design and proceeds to checkout
8. **Order placed**: Complete with confirmation and tracking

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or download the project files
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Running the Demo

1. Click the **"Run Demo"** button in the chat interface
2. Watch the automated conversation flow
3. Interact with the visualizations on the right panel
4. Explore the different components:
   - Plasmid circular maps
   - Sequence alignment viewer
   - Custom design interface
   - Checkout system

## Technology Stack

- **React 18** - Frontend framework
- **Tailwind CSS** - Styling and design system
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icons
- **Context API** - State management

## Project Structure

```
src/
├── components/
│   ├── Header.js              # Top navigation bar
│   ├── ChatPanel.js           # Left chat interface
│   ├── ResultsPanel.js        # Right results container
│   ├── PlasmidVisualization.js # Circular plasmid maps
│   ├── SequenceAlignment.js   # Alignment viewer
│   ├── NewDesign.js           # Custom design interface
│   └── Checkout.js            # Order management
├── context/
│   └── PlasmidContext.js      # Global state management
├── App.js                     # Main application component
├── index.js                   # React entry point
└── index.css                  # Global styles
```

## Customization

### Adding New Plasmids
Edit the `mockPlasmids` array in `src/context/PlasmidContext.js`:

```javascript
{
  id: 4,
  name: "pYOUR-PLASMID",
  description: "Your plasmid description",
  sequence: "ATGC...",
  length: 5000,
  features: [
    { name: "Gene", start: 100, end: 500, type: "gene", color: "#ff6b6b" }
  ],
  tags: ["Tag1", "Tag2"],
  company: "Your Company"
}
```

### Modifying the Demo Conversation
Edit the `demoConversation` array in `src/context/PlasmidContext.js` to customize the chat flow.

### Styling Changes
- Colors: Modify the custom colors in `tailwind.config.js`
- Animations: Adjust Framer Motion settings in individual components
- Layout: Update Tailwind classes throughout components

## Demo Features

### Chat Interface
- ✅ Natural language processing simulation
- ✅ Typing indicators and smooth animations
- ✅ Message history and scrolling
- ✅ Demo mode with automated responses

### Plasmid Visualizations
- ✅ Interactive circular maps
- ✅ Feature color coding and labels
- ✅ Click-to-select feature details
- ✅ Responsive design for different screen sizes

### Sequence Analysis
- ✅ Multi-sequence alignment
- ✅ Difference highlighting
- ✅ Expandable sequence viewer
- ✅ Position rulers and markers

### Design Tools
- ✅ AI-generated custom designs
- ✅ Feature annotation
- ✅ Sequence copying functionality
- ✅ Approval workflow

### Order Management
- ✅ Dynamic pricing based on options
- ✅ Multiple delivery timelines
- ✅ Format selection
- ✅ Order confirmation system

## Future Enhancements

This mockup could be extended with:
- Real AI/ML integration for plasmid analysis
- Actual sequence alignment algorithms
- Integration with laboratory information systems
- Real-time collaboration features
- Mobile-responsive design improvements
- Advanced search filters and sorting
- Batch processing capabilities

## License

This is a mockup/prototype application created for demonstration purposes.

## Support

For questions about this mockup, please refer to the code comments and documentation within the components. 