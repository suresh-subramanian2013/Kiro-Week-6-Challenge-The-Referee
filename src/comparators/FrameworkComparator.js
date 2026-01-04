import { frameworks } from '../data/frameworks.js';

export class FrameworkComparator {
  getDefaultComparison() {
    return {
      options: ['React', 'Vue', 'Angular'],
      constraints: ['learning-curve', 'performance', 'ecosystem', 'job-market', 'flexibility']
    };
  }

  async compare(options, constraints) {
    const scores = {};
    const analysis = {
      summary: '',
      recommendations: [],
      tradeoffs: {}
    };

    // Calculate scores for each framework
    for (const option of options) {
      scores[option] = {};
      const framework = frameworks[option];
      
      if (!framework) {
        // Handle unknown frameworks with neutral scores
        for (const constraint of constraints) {
          scores[option][constraint] = 3;
        }
        continue;
      }

      for (const constraint of constraints) {
        scores[option][constraint] = this.calculateScore(framework, constraint);
      }
    }

    // Generate analysis
    analysis.summary = this.generateSummary(options, scores, constraints);
    analysis.recommendations = this.generateRecommendations(options, scores);
    analysis.tradeoffs = this.generateTradeoffs(options, scores, constraints);

    return { scores, analysis };
  }

  calculateScore(framework, constraint) {
    const mapping = {
      'learning-curve': 6 - (framework.complexity?.score || 3), // Invert complexity
      'performance': framework.performance?.score || 3,
      'ecosystem': framework.ecosystem?.score || 3,
      'job-market': framework.popularity?.score || 3,
      'flexibility': framework.flexibility?.score || 3,
      'community': framework.community?.score || 3,
      'tooling': framework.tooling?.score || 3,
      'typescript': framework.typescript?.score || 3
    };

    return Math.max(1, Math.min(5, mapping[constraint] || 3));
  }

  generateSummary(options, scores, constraints) {
    const totalScores = {};
    
    for (const option of options) {
      totalScores[option] = constraints.reduce((sum, constraint) => 
        sum + scores[option][constraint], 0);
    }

    const winner = Object.keys(totalScores).reduce((a, b) => 
      totalScores[a] > totalScores[b] ? a : b);

    return `Across ${constraints.length} evaluation criteria, ${winner} demonstrates the strongest overall profile. Each framework excels in different areas - your choice should align with team expertise and project requirements.`;
  }

  generateRecommendations(options, scores) {
    return options.map(option => {
      const framework = frameworks[option];
      return {
        option,
        bestFor: framework?.idealFor?.join(', ') || 'General web development',
        avoid: framework?.challenges?.join(', ') || 'When simplicity is paramount',
        score: Object.values(scores[option]).reduce((a, b) => a + b, 0),
        keyStrengths: framework?.strengths?.slice(0, 3) || []
      };
    });
  }

  generateTradeoffs(options, scores, constraints) {
    const tradeoffs = {};
    
    for (const constraint of constraints) {
      const constraintScores = options.map(option => ({
        option,
        score: scores[option][constraint]
      })).sort((a, b) => b.score - a.score);

      tradeoffs[constraint] = {
        best: constraintScores[0],
        worst: constraintScores[constraintScores.length - 1],
        analysis: this.getConstraintAnalysis(constraint, constraintScores)
      };
    }

    return tradeoffs;
  }

  getConstraintAnalysis(constraint, scores) {
    const analyses = {
      'learning-curve': 'Easier frameworks may lack advanced features needed for complex applications.',
      'performance': 'Faster frameworks often require more optimization knowledge and setup.',
      'ecosystem': 'Larger ecosystems provide more solutions but increase decision complexity.',
      'job-market': 'Popular frameworks offer more opportunities but also more competition.',
      'flexibility': 'More flexible frameworks require more architectural decisions and setup.',
      'community': 'Larger communities provide better support but can have fragmented solutions.',
      'tooling': 'Better tooling improves productivity but may create vendor lock-in.',
      'typescript': 'Strong TypeScript support improves code quality but adds complexity.'
    };

    return analyses[constraint] || 'Each option involves specific trade-offs based on project context.';
  }
}