const fs = require('fs');
const path = require('path');

const controller = {
  // Add error control
  read: (req, res) => {
    if (req.params.file) {
      const staticPath = path.join(__dirname, req.params.file);
      const readStream = fs.createReadStream(staticPath);
      readStream.on('error', () => {
        res.sendStatus(500);
      });
      readStream.pipe(res);
      return;
    }
    res.status(400).send('Invalid request');
  }
}

module.exports = {
  read: controller.read
};