# The Referee 🏆

> **Week 6 Kiro Challenge**: A smart comparison tool that helps you make informed decisions by analyzing trade-offs instead of giving single answers.

## 🎯 What it does

The Referee is a decision-making tool that compares options across multiple dimensions and presents balanced analysis to help you choose the best solution for your specific needs. Instead of declaring a single "winner," it explains the trade-offs so you can make informed choices.

## ✨ Features

- 🔍 **Multi-Domain Comparisons**: Cloud services, JavaScript frameworks, API approaches
- ⚖️ **Trade-off Analysis**: Clear pros/cons with contextual scoring (1-5 scale)
- 🎯 **Context-Aware Recommendations**: "Best for" and "avoid when" guidance
- 🖥️ **CLI Interface**: Interactive command-line tool with guided prompts
- 🌐 **Web Interface**: Beautiful browser-based UI with responsive design
- 🎨 **Rich Formatting**: Color-coded results and professional styling
- 🔧 **Extensible Architecture**: Easy to add new comparison domains

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/suresh-subramanian2013/Kiro-Week-6-Challenge-The-Referee.git
cd Kiro-Week-6-Challenge-The-Referee

# Install dependencies
npm install
```

### Usage Options

**🖥️ CLI Version (Command Line)**
```bash
# Run in interactive mode
npm start

# Or run directly
node src/cli.js compare --interactive
```

**🌐 Web Version (Browser)**
```bash
# Start web server
npm run web

# Then open in browser:
# http://localhost:3000
```

### Requirements

- Node.js 18.0.0 or higher
- npm or yarn

## 📖 Usage

### 🌐 Web Interface (Recommended)

```bash
npm run web
```

Open **http://localhost:3000** in your browser for:
- Beautiful, responsive interface
- Interactive forms with auto-fill defaults
- Color-coded score tables
- Smooth animations and professional styling
- Mobile-friendly design

### 🖥️ CLI Interface

#### Interactive Mode
```bash
npm start
```

The interactive mode guides you through:
1. Choosing what to compare (Cloud, Framework, API, or Custom)
2. Automatic selection of relevant criteria
3. Formatted analysis with trade-offs

#### Direct Command Usage

```bash
# Compare cloud services
node src/cli.js compare --type=cloud --options="AWS,Azure,GCP" --constraints="cost,performance,ease-of-use"

# Compare JavaScript frameworks  
node src/cli.js compare --type=framework --options="React,Vue,Angular" --constraints="learning-curve,performance,ecosystem"

# Compare API approaches
node src/cli.js compare --type=api --options="REST,GraphQL,gRPC" --constraints="complexity,performance,tooling"

# Custom comparison
node src/cli.js compare --type=custom --options="Option1,Option2" --constraints="criteria1,criteria2"
```

### Available Options

| Type | Options | Default Criteria |
|------|---------|------------------|
| **cloud** | AWS, Azure, GCP, DigitalOcean, Vercel | cost, performance, ease-of-use, ecosystem, reliability |
| **framework** | React, Vue, Angular, Svelte, Next.js | learning-curve, performance, ecosystem, job-market, flexibility |
| **api** | REST, GraphQL, gRPC, WebSocket, Webhook | complexity, performance, tooling, flexibility, caching |

## 📊 Sample Output

```
🏆 Welcome to The Referee!

📊 COMPARISON RESULTS

Summary:
Based on the analysis across 5 criteria, React shows the strongest overall performance. 
However, the best choice depends on your specific priorities and use case.

Detailed Scores (1-5 scale):
Option       | learning-curve | performance | ecosystem | job-market | flexibility | Total
-------------|----------------|-------------|-----------|------------|-------------|-------
React        | 3              | 4           | 5         | 5          | 5           | 22
Vue          | 4              | 4           | 4         | 4          | 4           | 20
Angular      | 2              | 4           | 4         | 3          | 3           | 16

Recommendations:
React:
  ✅ Best for: Large applications, Teams with React experience, Projects needing flexibility
  ❌ Avoid when: Decision fatigue, Rapid ecosystem changes, Learning curve for beginners
  💪 Key strengths: Huge ecosystem, Strong job market, Flexible architecture

🏆 Overall Leader: React
Remember: The best choice depends on your specific requirements and constraints.
```

## 🏗️ Project Structure

```
├── src/                          # CLI application source
│   ├── cli.js                    # Main CLI interface with Commander.js
│   ├── comparators/              # Domain-specific comparison logic
│   │   ├── CloudComparator.js    # Cloud services comparison
│   │   ├── FrameworkComparator.js # JavaScript frameworks comparison
│   │   └── APIComparator.js      # API approaches comparison
│   ├── data/                     # Knowledge base and scoring data
│   │   ├── cloudServices.js      # Cloud services data & criteria
│   │   ├── frameworks.js         # Framework data & criteria  
│   │   └── apiApproaches.js      # API approaches data & criteria
│   └── utils/
│       └── formatter.js          # Output formatting utilities
├── public/                       # Web interface files
│   ├── index.html                # Main web interface
│   └── app.js                    # Frontend JavaScript logic
├── server.js                     # HTTP server for web interface
├── .kiro/                        # Kiro configuration (required)
│   ├── README.md                 # Kiro project documentation
│   └── steering/
│       └── development-guide.md  # Development guidelines
├── .gitignore                    # Git ignore rules
├── package.json                  # Project dependencies
└── README.md                     # This file
```

## 🔧 Architecture

### Core Components

1. **CLI Interface** - Interactive and direct command modes
2. **Comparators** - Domain-specific comparison logic and scoring
3. **Data Layer** - Knowledge base with criteria and scoring algorithms  
4. **Formatter** - Colorized, structured output presentation

### Design Principles

- **No Single Answers**: Always present trade-offs and multiple perspectives
- **Context-Aware**: Recommendations based on specific use cases
- **Extensible**: Easy to add new comparison domains
- **Transparent**: Clear scoring methodology and reasoning

## 🛠️ Adding New Comparators

1. Create comparator class in `src/comparators/`
2. Add data file in `src/data/`
3. Implement required methods:
   - `getDefaultComparison()`
   - `compare(options, constraints)`
   - `calculateScore(item, constraint)`
4. Update CLI to include new type

See `.kiro/steering/development-guide.md` for detailed instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your comparator following the architecture
4. Test with real-world scenarios
5. Submit a pull request

## 📝 License

MIT License - feel free to use and modify for your projects.

## 🎯 Week 6 Challenge Requirements

✅ **GitHub Repository**: Public repository with complete code  
✅ **Kiro Integration**: `.kiro` directory included at root  
✅ **Comparison Tool**: Compares options and explains trade-offs  
✅ **Decision Support**: Helps users choose instead of just consuming information  

---

*Built for Kiro Week 6 Challenge - The Referee*