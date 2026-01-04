#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { CloudComparator } from './comparators/CloudComparator.js';
import { FrameworkComparator } from './comparators/FrameworkComparator.js';
import { APIComparator } from './comparators/APIComparator.js';
import { formatResults } from './utils/formatter.js';

const program = new Command();

program
  .name('referee')
  .description('The Referee - Compare options and analyze trade-offs')
  .version('1.0.0');

program
  .command('compare')
  .description('Compare options with trade-off analysis')
  .option('-t, --type <type>', 'comparison type (cloud, framework, api)')
  .option('-o, --options <options>', 'comma-separated list of options to compare')
  .option('-c, --constraints <constraints>', 'comma-separated list of constraints/criteria')
  .option('-w, --weights <weights>', 'comma-separated weights for criteria (optional)')
  .option('-i, --interactive', 'run in interactive mode')
  .action(async (options) => {
    try {
      if (options.interactive) {
        await runInteractiveMode();
      } else {
        await runDirectMode(options);
      }
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

async function runInteractiveMode() {
  console.log(chalk.blue.bold('\n🏆 Welcome to The Referee!\n'));
  
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'What would you like to compare?',
      choices: [
        { name: 'Cloud Services (AWS, Azure, GCP)', value: 'cloud' },
        { name: 'JavaScript Frameworks (React, Vue, Angular)', value: 'framework' },
        { name: 'API Approaches (REST, GraphQL, gRPC)', value: 'api' },
        { name: 'Custom Comparison', value: 'custom' }
      ]
    }
  ]);

  let comparator;
  let options = [];
  let constraints = [];

  if (answers.type === 'custom') {
    const customAnswers = await inquirer.prompt([
      {
        type: 'input',
        name: 'options',
        message: 'Enter options to compare (comma-separated):',
        validate: input => input.trim().length > 0
      },
      {
        type: 'input',
        name: 'constraints',
        message: 'Enter criteria to evaluate (comma-separated):',
        validate: input => input.trim().length > 0
      }
    ]);
    
    options = customAnswers.options.split(',').map(s => s.trim());
    constraints = customAnswers.constraints.split(',').map(s => s.trim());
    comparator = { compare: (opts, cons) => generateGenericComparison(opts, cons) };
  } else {
    comparator = getComparator(answers.type);
    const comparisonData = comparator.getDefaultComparison();
    options = comparisonData.options;
    constraints = comparisonData.constraints;
  }

  console.log(chalk.yellow('\n⚖️  Analyzing trade-offs...\n'));
  
  const results = await comparator.compare(options, constraints);
  formatResults(results, options, constraints);
}

async function runDirectMode(options) {
  if (!options.type || !options.options) {
    console.error(chalk.red('Error: --type and --options are required'));
    process.exit(1);
  }

  const comparator = getComparator(options.type);
  const optionsList = options.options.split(',').map(s => s.trim());
  const constraintsList = options.constraints ? 
    options.constraints.split(',').map(s => s.trim()) : 
    comparator.getDefaultComparison().constraints;

  console.log(chalk.yellow('\n⚖️  Analyzing trade-offs...\n'));
  
  const results = await comparator.compare(optionsList, constraintsList);
  formatResults(results, optionsList, constraintsList);
}

function getComparator(type) {
  switch (type) {
    case 'cloud':
      return new CloudComparator();
    case 'framework':
      return new FrameworkComparator();
    case 'api':
      return new APIComparator();
    default:
      throw new Error(`Unknown comparison type: ${type}`);
  }
}

function generateGenericComparison(options, constraints) {
  // Generic comparison for custom inputs
  return {
    scores: options.reduce((acc, option) => {
      acc[option] = constraints.reduce((scores, constraint) => {
        scores[constraint] = Math.floor(Math.random() * 5) + 1; // Random score 1-5
        return scores;
      }, {});
      return acc;
    }, {}),
    analysis: {
      summary: 'Custom comparison generated. Scores are randomized for demonstration.',
      recommendations: options.map(option => ({
        option,
        bestFor: 'General use cases',
        avoid: 'When specific requirements are critical'
      }))
    }
  };
}

// Handle interactive mode if no arguments provided
if (process.argv.length === 2) {
  program.parse(['node', 'referee', 'compare', '--interactive']);
} else {
  program.parse();
}