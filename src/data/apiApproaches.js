export const apiApproaches = {
  'REST': {
    complexity: { score: 2 },
    performance: { score: 3 },
    tooling: { score: 5 },
    flexibility: { score: 4 },
    caching: { score: 5 },
    learningCurve: { score: 2 },
    ecosystem: { score: 5 },
    scalability: { score: 4 },
    benefits: [
      'Simple and intuitive',
      'Excellent caching support',
      'Mature tooling ecosystem',
      'HTTP standard compliance',
      'Stateless architecture'
    ],
    bestFor: [
      'CRUD operations',
      'Public APIs',
      'Microservices',
      'Mobile applications',
      'Simple data models'
    ],
    avoidWhen: [
      'Complex data relationships',
      'Real-time requirements',
      'Over-fetching concerns',
      'Rapid schema evolution'
    ]
  },
  
  'GraphQL': {
    complexity: { score: 4 },
    performance: { score: 4 },
    tooling: { score: 4 },
    flexibility: { score: 5 },
    caching: { score: 2 },
    learningCurve: { score: 4 },
    ecosystem: { score: 4 },
    scalability: { score: 4 },
    benefits: [
      'Single endpoint',
      'Precise data fetching',
      'Strong type system',
      'Real-time subscriptions',
      'Self-documenting'
    ],
    bestFor: [
      'Complex data relationships',
      'Mobile applications',
      'Rapid frontend development',
      'Multiple client types',
      'Real-time features'
    ],
    avoidWhen: [
      'Simple CRUD operations',
      'File uploads/downloads',
      'Heavy caching requirements',
      'Team lacks GraphQL experience'
    ]
  },
  
  'gRPC': {
    complexity: { score: 4 },
    performance: { score: 5 },
    tooling: { score: 3 },
    flexibility: { score: 3 },
    caching: { score: 2 },
    learningCurve: { score: 4 },
    ecosystem: { score: 3 },
    scalability: { score: 5 },
    benefits: [
      'High performance',
      'Strong typing',
      'Bi-directional streaming',
      'Code generation',
      'Efficient serialization'
    ],
    bestFor: [
      'Microservices communication',
      'High-performance systems',
      'Real-time streaming',
      'Internal APIs',
      'Polyglot environments'
    ],
    avoidWhen: [
      'Browser-based clients',
      'Simple request/response',
      'Public APIs',
      'Limited tooling support'
    ]
  },
  
  'WebSocket': {
    complexity: { score: 3 },
    performance: { score: 4 },
    tooling: { score: 3 },
    flexibility: { score: 4 },
    caching: { score: 1 },
    learningCurve: { score: 3 },
    ecosystem: { score: 3 },
    scalability: { score: 3 },
    benefits: [
      'Real-time communication',
      'Low latency',
      'Bi-directional',
      'Persistent connections',
      'Event-driven'
    ],
    bestFor: [
      'Real-time applications',
      'Chat systems',
      'Live updates',
      'Gaming applications',
      'Collaborative tools'
    ],
    avoidWhen: [
      'Simple request/response',
      'Stateless requirements',
      'Heavy caching needs',
      'SEO-critical content'
    ]
  },
  
  'Webhook': {
    complexity: { score: 2 },
    performance: { score: 3 },
    tooling: { score: 3 },
    flexibility: { score: 3 },
    caching: { score: 1 },
    learningCurve: { score: 2 },
    ecosystem: { score: 4 },
    scalability: { score: 3 },
    benefits: [
      'Event-driven architecture',
      'Decoupled systems',
      'Real-time notifications',
      'Simple implementation',
      'HTTP-based'
    ],
    bestFor: [
      'Event notifications',
      'Third-party integrations',
      'Asynchronous processing',
      'System decoupling',
      'Automation triggers'
    ],
    avoidWhen: [
      'Synchronous responses needed',
      'Complex data queries',
      'High-frequency events',
      'Guaranteed delivery required'
    ]
  }
};