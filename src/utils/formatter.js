import chalk from 'chalk';

export function formatResults(results, options, constraints) {
  const { scores, analysis } = results;
  
  console.log(chalk.blue.bold('📊 COMPARISON RESULTS\n'));
  
  // Summary
  console.log(chalk.yellow.bold('Summary:'));
  console.log(chalk.white(analysis.summary));
  console.log();
  
  // Scores table
  console.log(chalk.yellow.bold('Detailed Scores (1-5 scale):'));
  formatScoresTable(scores, options, constraints);
  console.log();
  
  // Recommendations
  console.log(chalk.yellow.bold('Recommendations:'));
  formatRecommendations(analysis.recommendations);
  console.log();
  
  // Trade-offs analysis
  console.log(chalk.yellow.bold('Trade-offs Analysis:'));
  formatTradeoffs(analysis.tradeoffs);
  console.log();
  
  // Final verdict
  const winner = analysis.recommendations.reduce((prev, current) => 
    (prev.score > current.score) ? prev : current
  );
  
  console.log(chalk.green.bold(`🏆 Overall Leader: ${winner.option}`));
  console.log(chalk.gray('Remember: The best choice depends on your specific requirements and constraints.'));
}

function formatScoresTable(scores, options, constraints) {
  // Header
  const header = ['Option', ...constraints, 'Total'].map(h => h.padEnd(12));
  console.log(chalk.cyan(header.join(' | ')));
  console.log(chalk.gray('-'.repeat(header.join(' | ').length)));
  
  // Rows
  options.forEach(option => {
    const optionScores = constraints.map(constraint => scores[option][constraint]);
    const total = optionScores.reduce((sum, score) => sum + score, 0);
    
    const row = [
      option.padEnd(12),
      ...optionScores.map(score => formatScore(score).padEnd(12)),
      chalk.bold(total.toString()).padEnd(12)
    ];
    
    console.log(row.join(' | '));
  });
}

function formatScore(score) {
  if (score >= 4) return chalk.green(score.toString());
  if (score >= 3) return chalk.yellow(score.toString());
  return chalk.red(score.toString());
}

function formatRecommendations(recommendations) {
  recommendations.forEach(rec => {
    console.log(chalk.white.bold(`${rec.option}:`));
    console.log(chalk.green(`  ✅ Best for: ${rec.bestFor}`));
    console.log(chalk.red(`  ❌ Avoid when: ${rec.avoid}`));
    
    if (rec.keyStrengths && rec.keyStrengths.length > 0) {
      console.log(chalk.blue(`  💪 Key strengths: ${rec.keyStrengths.join(', ')}`));
    }
    
    if (rec.keyBenefits && rec.keyBenefits.length > 0) {
      console.log(chalk.blue(`  💪 Key benefits: ${rec.keyBenefits.join(', ')}`));
    }
    
    console.log();
  });
}

function formatTradeoffs(tradeoffs) {
  Object.entries(tradeoffs).forEach(([constraint, data]) => {
    console.log(chalk.white.bold(`${constraint.toUpperCase()}:`));
    console.log(chalk.green(`  🥇 Best: ${data.best.option} (${data.best.score}/5)`));
    console.log(chalk.red(`  🥉 Worst: ${data.worst.option} (${data.worst.score}/5)`));
    console.log(chalk.gray(`  💡 ${data.analysis}`));
    console.log();
  });
}

export function formatError(error) {
  console.error(chalk.red.bold('❌ Error:'), chalk.red(error.message));
  if (error.stack) {
    console.error(chalk.gray(error.stack));
  }
}

export function formatWarning(message) {
  console.warn(chalk.yellow.bold('⚠️  Warning:'), chalk.yellow(message));
}

export function formatSuccess(message) {
  console.log(chalk.green.bold('✅ Success:'), chalk.green(message));
}