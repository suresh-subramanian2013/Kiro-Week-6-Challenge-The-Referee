# The Referee Development Guide

## Project Overview

The Referee is a decision-making tool that compares options and explains trade-offs to help users make informed choices. Instead of providing single answers, it presents balanced analysis across multiple criteria.

## Architecture

### Core Components

1. **CLI Interface** (`src/cli.js`)
   - Command-line interface using Commander.js
   - Interactive and direct modes
   - Error handling and user experience

2. **Comparators** (`src/comparators/`)
   - Domain-specific comparison logic
   - Scoring algorithms
   - Analysis generation

3. **Data Layer** (`src/data/`)
   - Knowledge base for different domains
   - Scoring criteria and weights
   - Domain-specific insights

4. **Utilities** (`src/utils/`)
   - Output formatting
   - Helper functions
   - Common utilities

### Design Principles

- **No Single Answers**: Always present trade-offs and multiple perspectives
- **Context-Aware**: Recommendations based on specific use cases and constraints
- **Extensible**: Easy to add new comparison domains
- **User-Friendly**: Clear, colorized output with actionable insights

## Adding New Comparators

1. Create a new comparator class in `src/comparators/`
2. Implement required methods:
   - `getDefaultComparison()` - Default options and constraints
   - `compare(options, constraints)` - Main comparison logic
   - `calculateScore(item, constraint)` - Scoring algorithm
   - `generateSummary()`, `generateRecommendations()`, `generateTradeoffs()`

3. Add corresponding data file in `src/data/`
4. Update CLI to include new comparator type

## Testing Strategy

- Unit tests for individual comparators
- Integration tests for CLI interface
- Manual testing with real-world scenarios
- Validation of scoring algorithms

## Best Practices

- Keep scoring algorithms transparent and explainable
- Provide context for all recommendations
- Include both strengths and weaknesses
- Make trade-offs explicit and clear
- Ensure output is actionable