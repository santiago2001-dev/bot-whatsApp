const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: 'sessions',
  }),
  puppeteer: {},
  headless: true,
  args: ['--no-sandbox'],
  webVersionCache: {
    type: 'remote',
    remotePath:
      'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
  },
});

client.on('qr', (qr) => {
  client.qrCode = qr;
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.initialize().catch((err) => console.log(err));

module.exports = {
  client,
};
