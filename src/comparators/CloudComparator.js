import { cloudServices } from '../data/cloudServices.js';

export class CloudComparator {
  getDefaultComparison() {
    return {
      options: ['AWS', 'Azure', 'GCP'],
      constraints: ['cost', 'performance', 'ease-of-use', 'ecosystem', 'reliability']
    };
  }

  async compare(options, constraints) {
    const scores = {};
    const analysis = {
      summary: '',
      recommendations: [],
      tradeoffs: {}
    };

    // Calculate scores for each option
    for (const option of options) {
      scores[option] = {};
      const service = cloudServices[option];
      
      if (!service) {
        // Handle unknown services with neutral scores
        for (const constraint of constraints) {
          scores[option][constraint] = 3;
        }
        continue;
      }

      for (const constraint of constraints) {
        scores[option][constraint] = this.calculateScore(service, constraint);
      }
    }

    // Generate analysis
    analysis.summary = this.generateSummary(options, scores, constraints);
    analysis.recommendations = this.generateRecommendations(options, scores);
    analysis.tradeoffs = this.generateTradeoffs(options, scores, constraints);

    return { scores, analysis };
  }

  calculateScore(service, constraint) {
    const mapping = {
      'cost': service.pricing?.score || 3,
      'performance': service.performance?.score || 3,
      'ease-of-use': service.usability?.score || 3,
      'ecosystem': service.ecosystem?.score || 3,
      'reliability': service.reliability?.score || 3,
      'scalability': service.scalability?.score || 3,
      'security': service.security?.score || 3
    };

    return mapping[constraint] || 3;
  }

  generateSummary(options, scores, constraints) {
    const totalScores = {};
    
    for (const option of options) {
      totalScores[option] = constraints.reduce((sum, constraint) => 
        sum + scores[option][constraint], 0);
    }

    const winner = Object.keys(totalScores).reduce((a, b) => 
      totalScores[a] > totalScores[b] ? a : b);

    return `Based on the analysis across ${constraints.length} criteria, ${winner} shows the strongest overall performance. However, the best choice depends on your specific priorities and use case.`;
  }

  generateRecommendations(options, scores) {
    return options.map(option => {
      const service = cloudServices[option];
      return {
        option,
        bestFor: service?.strengths?.join(', ') || 'General cloud computing needs',
        avoid: service?.weaknesses?.join(', ') || 'When cost is the primary concern',
        score: Object.values(scores[option]).reduce((a, b) => a + b, 0)
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
      'cost': 'Lower costs often mean fewer included services or pay-per-use pricing models.',
      'performance': 'Higher performance typically comes with increased complexity and cost.',
      'ease-of-use': 'Easier platforms may have less flexibility for advanced configurations.',
      'ecosystem': 'Larger ecosystems provide more options but can be overwhelming for beginners.',
      'reliability': 'Higher reliability usually requires more redundancy and higher costs.'
    };

    return analyses[constraint] || 'Trade-offs vary based on specific implementation needs.';
  }
}