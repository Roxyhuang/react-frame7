const shell = require('shelljs');
const os = require('os');

shell.exec(`webpack-dashboard -p 3300 -c blue -t dashboard -- babel-node build/bin/commands.js dev`);
