export const frameworks = {
  'React': {
    complexity: { score: 3 },
    performance: { score: 4 },
    ecosystem: { score: 5 },
    popularity: { score: 5 },
    flexibility: { score: 5 },
    community: { score: 5 },
    tooling: { score: 5 },
    typescript: { score: 4 },
    strengths: [
      'Huge ecosystem',
      'Strong job market',
      'Flexible architecture',
      'Great tooling',
      'Meta backing'
    ],
    idealFor: [
      'Large applications',
      'Teams with React experience',
      'Projects needing flexibility',
      'Component reusability'
    ],
    challenges: [
      'Decision fatigue',
      'Rapid ecosystem changes',
      'Learning curve for beginners'
    ]
  },
  
  'Vue': {
    complexity: { score: 2 },
    performance: { score: 4 },
    ecosystem: { score: 4 },
    popularity: { score: 4 },
    flexibility: { score: 4 },
    community: { score: 4 },
    tooling: { score: 4 },
    typescript: { score: 4 },
    strengths: [
      'Gentle learning curve',
      'Great documentation',
      'Progressive adoption',
      'Good performance',
      'Template syntax'
    ],
    idealFor: [
      'Beginners to frameworks',
      'Progressive enhancement',
      'Small to medium projects',
      'Teams wanting simplicity'
    ],
    challenges: [
      'Smaller ecosystem than React',
      'Less job market demand',
      'Fewer large-scale examples'
    ]
  },
  
  'Angular': {
    complexity: { score: 5 },
    performance: { score: 4 },
    ecosystem: { score: 4 },
    popularity: { score: 3 },
    flexibility: { score: 3 },
    community: { score: 4 },
    tooling: { score: 5 },
    typescript: { score: 5 },
    strengths: [
      'Full framework solution',
      'Excellent TypeScript support',
      'Great tooling',
      'Enterprise-ready',
      'Google backing'
    ],
    idealFor: [
      'Large enterprise applications',
      'Teams familiar with TypeScript',
      'Projects needing structure',
      'Long-term maintenance'
    ],
    challenges: [
      'Steep learning curve',
      'Opinionated architecture',
      'Heavy framework overhead'
    ]
  },
  
  'Svelte': {
    complexity: { score: 2 },
    performance: { score: 5 },
    ecosystem: { score: 2 },
    popularity: { score: 2 },
    flexibility: { score: 3 },
    community: { score: 3 },
    tooling: { score: 3 },
    typescript: { score: 3 },
    strengths: [
      'Excellent performance',
      'Small bundle sizes',
      'Simple syntax',
      'Compile-time optimizations',
      'No virtual DOM'
    ],
    idealFor: [
      'Performance-critical apps',
      'Small bundle size requirements',
      'Simple to medium complexity',
      'Developer experience focus'
    ],
    challenges: [
      'Smaller ecosystem',
      'Limited job market',
      'Fewer learning resources'
    ]
  },
  
  'Next.js': {
    complexity: { score: 3 },
    performance: { score: 5 },
    ecosystem: { score: 4 },
    popularity: { score: 4 },
    flexibility: { score: 4 },
    community: { score: 4 },
    tooling: { score: 5 },
    typescript: { score: 5 },
    strengths: [
      'Full-stack capabilities',
      'Excellent performance',
      'Great developer experience',
      'Built-in optimizations',
      'Vercel integration'
    ],
    idealFor: [
      'Full-stack React apps',
      'SEO-critical applications',
      'E-commerce sites',
      'Static site generation'
    ],
    challenges: [
      'React dependency',
      'Vercel vendor lock-in potential',
      'Complex routing in some cases'
    ]
  }
};