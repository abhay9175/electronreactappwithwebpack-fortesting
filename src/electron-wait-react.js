const net = require('net');
const port = process.env.PORT ? (process.env.PORT - 100) : 3000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () => {
  client.connect({ port: port }, () => {
    client.end();
    if (!startedElectron) {
      console.log('Starting electron');
      startedElectron = true;
      const exec = require('child_process').exec;
      exec('npm run electron');
    }
  });
};

tryConnection();

client.on('error', (error) => {
  setTimeout(tryConnection, 1000);
});

// Handle process termination signal (SIGTERM)
process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Stopping Electron.');
  process.exit(0);
});


const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
});
mainWindow.loadURL(startUrl);

