import { apiApproaches } from '../data/apiApproaches.js';

export class APIComparator {
  getDefaultComparison() {
    return {
      options: ['REST', 'GraphQL', 'gRPC'],
      constraints: ['complexity', 'performance', 'tooling', 'flexibility', 'caching']
    };
  }

  async compare(options, constraints) {
    const scores = {};
    const analysis = {
      summary: '',
      recommendations: [],
      tradeoffs: {}
    };

    // Calculate scores for each API approach
    for (const option of options) {
      scores[option] = {};
      const approach = apiApproaches[option];
      
      if (!approach) {
        // Handle unknown approaches with neutral scores
        for (const constraint of constraints) {
          scores[option][constraint] = 3;
        }
        continue;
      }

      for (const constraint of constraints) {
        scores[option][constraint] = this.calculateScore(approach, constraint);
      }
    }

    // Generate analysis
    analysis.summary = this.generateSummary(options, scores, constraints);
    analysis.recommendations = this.generateRecommendations(options, scores);
    analysis.tradeoffs = this.generateTradeoffs(options, scores, constraints);

    return { scores, analysis };
  }

  calculateScore(approach, constraint) {
    const mapping = {
      'complexity': 6 - (approach.complexity?.score || 3), // Invert complexity
      'performance': approach.performance?.score || 3,
      'tooling': approach.tooling?.score || 3,
      'flexibility': approach.flexibility?.score || 3,
      'caching': approach.caching?.score || 3,
      'learning-curve': 6 - (approach.learningCurve?.score || 3),
      'ecosystem': approach.ecosystem?.score || 3,
      'scalability': approach.scalability?.score || 3
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

    return `Evaluating ${constraints.length} key factors, ${winner} shows the best overall balance. However, API choice should be driven by specific use cases, team expertise, and system architecture requirements.`;
  }

  generateRecommendations(options, scores) {
    return options.map(option => {
      const approach = apiApproaches[option];
      return {
        option,
        bestFor: approach?.bestFor?.join(', ') || 'General API development',
        avoid: approach?.avoidWhen?.join(', ') || 'When simplicity is critical',
        score: Object.values(scores[option]).reduce((a, b) => a + b, 0),
        keyBenefits: approach?.benefits?.slice(0, 3) || []
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
      'complexity': 'Simpler APIs may lack advanced features needed for sophisticated applications.',
      'performance': 'Higher performance often requires more careful implementation and optimization.',
      'tooling': 'Better tooling improves development speed but may create vendor dependencies.',
      'flexibility': 'More flexible APIs require more design decisions and can be over-engineered.',
      'caching': 'Better caching improves performance but adds complexity to invalidation strategies.',
      'learning-curve': 'Easier-to-learn technologies may have limitations in advanced scenarios.',
      'ecosystem': 'Mature ecosystems provide more resources but can have fragmented standards.',
      'scalability': 'More scalable solutions often require additional infrastructure complexity.'
    };

    return analyses[constraint] || 'Trade-offs depend on specific implementation requirements and constraints.';
  }
}