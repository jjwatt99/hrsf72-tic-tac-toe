#!/usr/bin/env node

var program = require('commander');

var tic = function() {
  if (options.start) {
  	console.log('\n' + 
      ' 1 | 2 | 3 \n' +
      '-----------\n' +
      ' 4 | 5 | 6 \n' +
      '-----------\n' +
      ' 7 | 8 | 9 \n'
  	);
  }
};

program
  .version('0.0.1')
  .command('tictac')
  .description('starts game of tic tac toe')
  .option('-s, --start', 'start game')
  .option('-e, --end', 'end game')
  .option('-f, --first', 'first player plays')
  .option('-s, --second', 'second player plays')
  .action('');

program.parse(process.argv);