// The Referee Web App
class RefereeApp {
    constructor() {
        this.initializeEventListeners();
        this.setupFormDefaults();
    }

    initializeEventListeners() {
        const form = document.getElementById('comparisonForm');
        const typeSelect = document.getElementById('comparisonType');
        
        form.addEventListener('submit', (e) => this.handleSubmit(e));
        typeSelect.addEventListener('change', (e) => this.updateDefaults(e.target.value));
    }

    setupFormDefaults() {
        const defaults = {
            framework: {
                options: 'React, Vue, Angular',
                constraints: 'learning-curve, performance, ecosystem, job-market, flexibility'
            },
            cloud: {
                options: 'AWS, Azure, GCP',
                constraints: 'cost, performance, ease-of-use, ecosystem, reliability'
            },
            api: {
                options: 'REST, GraphQL, gRPC',
                constraints: 'complexity, performance, tooling, flexibility, caching'
            }
        };
        
        this.defaults = defaults;
    }

    updateDefaults(type) {
        if (this.defaults[type]) {
            document.getElementById('options').value = this.defaults[type].options;
            document.getElementById('constraints').value = this.defaults[type].constraints;
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const type = document.getElementById('comparisonType').value;
        const options = document.getElementById('options').value.split(',').map(s => s.trim());
        const constraints = document.getElementById('constraints').value.split(',').map(s => s.trim());
        
        this.showLoading();
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const results = await this.performComparison(type, options, constraints);
        this.displayResults(results, options, constraints);
        
        this.hideLoading();
    }

    showLoading() {
        document.getElementById('loading').classList.add('show');
        document.getElementById('results').classList.remove('show');
    }

    hideLoading() {
        document.getElementById('loading').classList.remove('show');
    }

    async performComparison(type, options, constraints) {
        // Simulate the comparison logic from our CLI tool
        const data = this.getComparisonData(type);
        const scores = {};
        
        // Calculate scores for each option
        options.forEach(option => {
            scores[option] = {};
            constraints.forEach(constraint => {
                scores[option][constraint] = this.calculateScore(data[option], constraint, type);
            });
        });

        // Generate analysis
        const analysis = this.generateAnalysis(options, scores, constraints, type);
        
        return { scores, analysis };
    }

    getComparisonData(type) {
        const data = {
            framework: {
                'React': { complexity: 3, performance: 4, ecosystem: 5, popularity: 5, flexibility: 5 },
                'Vue': { complexity: 2, performance: 4, ecosystem: 4, popularity: 4, flexibility: 4 },
                'Angular': { complexity: 5, performance: 4, ecosystem: 4, popularity: 3, flexibility: 3 },
                'Svelte': { complexity: 2, performance: 5, ecosystem: 2, popularity: 2, flexibility: 3 }
            },
            cloud: {
                'AWS': { pricing: 3, performance: 5, usability: 3, ecosystem: 5, reliability: 5 },
                'Azure': { pricing: 3, performance: 4, usability: 4, ecosystem: 4, reliability: 4 },
                'GCP': { pricing: 4, performance: 4, usability: 4, ecosystem: 3, reliability: 4 }
            },
            api: {
                'REST': { complexity: 2, performance: 3, tooling: 5, flexibility: 4, caching: 5 },
                'GraphQL': { complexity: 4, performance: 4, tooling: 4, flexibility: 5, caching: 2 },
                'gRPC': { complexity: 4, performance: 5, tooling: 3, flexibility: 3, caching: 2 }
            }
        };
        
        return data[type] || {};
    }

    calculateScore(itemData, constraint, type) {
        if (!itemData) return 3; // Default score for unknown items
        
        const mapping = {
            framework: {
                'learning-curve': (data) => 6 - (data.complexity || 3),
                'performance': (data) => data.performance || 3,
                'ecosystem': (data) => data.ecosystem || 3,
                'job-market': (data) => data.popularity || 3,
                'flexibility': (data) => data.flexibility || 3
            },
            cloud: {
                'cost': (data) => data.pricing || 3,
                'performance': (data) => data.performance || 3,
                'ease-of-use': (data) => data.usability || 3,
                'ecosystem': (data) => data.ecosystem || 3,
                'reliability': (data) => data.reliability || 3
            },
            api: {
                'complexity': (data) => 6 - (data.complexity || 3),
                'performance': (data) => data.performance || 3,
                'tooling': (data) => data.tooling || 3,
                'flexibility': (data) => data.flexibility || 3,
                'caching': (data) => data.caching || 3
            }
        };
        
        const typeMapping = mapping[type];
        if (typeMapping && typeMapping[constraint]) {
            return Math.max(1, Math.min(5, typeMapping[constraint](itemData)));
        }
        
        return 3; // Default score
    }

    generateAnalysis(options, scores, constraints, type) {
        const totalScores = {};
        
        options.forEach(option => {
            totalScores[option] = constraints.reduce((sum, constraint) => 
                sum + scores[option][constraint], 0);
        });

        const winner = Object.keys(totalScores).reduce((a, b) => 
            totalScores[a] > totalScores[b] ? a : b);

        const recommendations = options.map(option => ({
            option,
            score: totalScores[option],
            bestFor: this.getBestFor(option, type),
            avoid: this.getAvoidWhen(option, type)
        }));

        return {
            summary: `Based on ${constraints.length} criteria analysis, ${winner} shows the strongest overall performance. However, the best choice depends on your specific requirements.`,
            winner,
            recommendations,
            totalScores
        };
    }

    getBestFor(option, type) {
        const bestFor = {
            framework: {
                'React': 'Large applications, flexible architecture, strong ecosystem',
                'Vue': 'Beginners, progressive enhancement, simple to medium projects',
                'Angular': 'Enterprise applications, TypeScript projects, structured development',
                'Svelte': 'Performance-critical apps, small bundle sizes'
            },
            cloud: {
                'AWS': 'Enterprise applications, comprehensive service catalog, global scale',
                'Azure': 'Microsoft integration, hybrid cloud, enterprise Windows environments',
                'GCP': 'Data analytics, machine learning, competitive pricing'
            },
            api: {
                'REST': 'CRUD operations, public APIs, simple data models',
                'GraphQL': 'Complex data relationships, mobile apps, flexible queries',
                'gRPC': 'Microservices, high-performance systems, internal APIs'
            }
        };
        
        return bestFor[type]?.[option] || 'General use cases';
    }

    getAvoidWhen(option, type) {
        const avoidWhen = {
            framework: {
                'React': 'Simple projects, decision fatigue concerns, beginner teams',
                'Vue': 'Large enterprise needs, extensive ecosystem requirements',
                'Angular': 'Simple projects, rapid prototyping, small teams',
                'Svelte': 'Large ecosystem needs, extensive third-party integrations'
            },
            cloud: {
                'AWS': 'Simple projects, cost sensitivity, ease-of-use priority',
                'Azure': 'Non-Microsoft environments, cutting-edge services needed',
                'GCP': 'Enterprise features critical, extensive service catalog needed'
            },
            api: {
                'REST': 'Complex data relationships, real-time requirements',
                'GraphQL': 'Simple CRUD, heavy caching needs, team lacks experience',
                'gRPC': 'Browser clients, public APIs, simple request/response'
            }
        };
        
        return avoidWhen[type]?.[option] || 'Specific requirements not met';
    }

    displayResults(results, options, constraints) {
        const resultsDiv = document.getElementById('results');
        const { scores, analysis } = results;
        
        let html = `
            <h2>📊 Comparison Results</h2>
            <p><strong>Summary:</strong> ${analysis.summary}</p>
            
            <h3>Detailed Scores (1-5 scale)</h3>
            <table class="score-table">
                <thead>
                    <tr>
                        <th>Option</th>
                        ${constraints.map(c => `<th>${c}</th>`).join('')}
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${options.map(option => `
                        <tr>
                            <td><strong>${option}</strong></td>
                            ${constraints.map(constraint => {
                                const score = scores[option][constraint];
                                const scoreClass = score >= 4 ? 'high' : score >= 3 ? 'medium' : 'low';
                                return `<td><span class="score ${scoreClass}">${score}</span></td>`;
                            }).join('')}
                            <td><strong>${analysis.totalScores[option]}</strong></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            
            <div class="winner">
                <h2>🏆 Overall Leader: ${analysis.winner}</h2>
                <p>Remember: The best choice depends on your specific requirements and constraints.</p>
            </div>
            
            <h3>Recommendations</h3>
            ${analysis.recommendations.map(rec => `
                <div class="recommendation">
                    <h3>${rec.option} (Score: ${rec.score})</h3>
                    <div class="pros">Best for: ${rec.bestFor}</div>
                    <div class="cons">Avoid when: ${rec.avoid}</div>
                </div>
            `).join('')}
        `;
        
        resultsDiv.innerHTML = html;
        resultsDiv.classList.add('show');
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new RefereeApp();
});