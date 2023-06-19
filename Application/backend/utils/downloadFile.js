const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function downloadFile(url, filename) {
  const editedName = filename.toLowerCase().split(' ').join('_')
  const pathToFile = path.resolve(__dirname, '../downloads', editedName);
  const writer = fs.createWriteStream(pathToFile);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', () => resolve(`http://localhost:3000/downloads/${editedName}`));
    writer.on('error', reject);
  });
}

module.exports = downloadFile;
