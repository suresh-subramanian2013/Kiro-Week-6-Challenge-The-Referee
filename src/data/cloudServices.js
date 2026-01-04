export const cloudServices = {
  'AWS': {
    pricing: { score: 3 },
    performance: { score: 5 },
    usability: { score: 3 },
    ecosystem: { score: 5 },
    reliability: { score: 5 },
    scalability: { score: 5 },
    security: { score: 5 },
    strengths: [
      'Largest service catalog',
      'Mature ecosystem',
      'Global infrastructure',
      'Enterprise features',
      'Strong security'
    ],
    weaknesses: [
      'Complex pricing',
      'Steep learning curve',
      'Can be overwhelming',
      'Vendor lock-in potential'
    ]
  },
  
  'Azure': {
    pricing: { score: 3 },
    performance: { score: 4 },
    usability: { score: 4 },
    ecosystem: { score: 4 },
    reliability: { score: 4 },
    scalability: { score: 4 },
    security: { score: 5 },
    strengths: [
      'Microsoft integration',
      'Hybrid cloud capabilities',
      'Enterprise focus',
      'Good Windows support',
      'Active Directory integration'
    ],
    weaknesses: [
      'Smaller service catalog than AWS',
      'Less mature in some areas',
      'Microsoft-centric approach'
    ]
  },
  
  'GCP': {
    pricing: { score: 4 },
    performance: { score: 4 },
    usability: { score: 4 },
    ecosystem: { score: 3 },
    reliability: { score: 4 },
    scalability: { score: 4 },
    security: { score: 4 },
    strengths: [
      'Competitive pricing',
      'Strong data analytics',
      'Machine learning services',
      'Clean interface',
      'Kubernetes expertise'
    ],
    weaknesses: [
      'Smaller ecosystem',
      'Fewer enterprise features',
      'Less global presence',
      'Newer to enterprise market'
    ]
  },
  
  'DigitalOcean': {
    pricing: { score: 5 },
    performance: { score: 3 },
    usability: { score: 5 },
    ecosystem: { score: 2 },
    reliability: { score: 3 },
    scalability: { score: 3 },
    security: { score: 3 },
    strengths: [
      'Simple pricing',
      'Developer-friendly',
      'Easy to use',
      'Good documentation',
      'Cost-effective'
    ],
    weaknesses: [
      'Limited enterprise features',
      'Smaller service catalog',
      'Less global infrastructure'
    ]
  },
  
  'Vercel': {
    pricing: { score: 4 },
    performance: { score: 4 },
    usability: { score: 5 },
    ecosystem: { score: 3 },
    reliability: { score: 4 },
    scalability: { score: 4 },
    security: { score: 4 },
    strengths: [
      'Excellent for frontend',
      'Zero-config deployments',
      'Great developer experience',
      'Edge network',
      'Serverless focus'
    ],
    weaknesses: [
      'Limited backend services',
      'Focused on specific use cases',
      'Can get expensive at scale'
    ]
  }
};