const fs = require('fs');
const path = require('path');

const privateDir = path.join(__dirname, 'src', 'private');
const configTemplate = path.join(__dirname, 'src', 'config', 'userConfig.template.js');
const watchlistTemplate = path.join(__dirname, 'src', 'data', 'watchlists.template.js');

const targetConfig = path.join(privateDir, 'userConfig.js');
const targetWatchlist = path.join(privateDir, 'watchlists.js');

if (!fs.existsSync(privateDir)){
    fs.mkdirSync(privateDir);
    console.log('Created private directory');
}

if (!fs.existsSync(targetConfig) && fs.existsSync(configTemplate)) {
    fs.copyFileSync(configTemplate, targetConfig);
    console.log('Created userConfig.js from template');
}

if (!fs.existsSync(targetWatchlist) && fs.existsSync(watchlistTemplate)) {
    fs.copyFileSync(watchlistTemplate, targetWatchlist);
    console.log('Created watchlists.js from template');
}

console.log('Security setup complete!');
