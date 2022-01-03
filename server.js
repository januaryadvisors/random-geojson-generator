const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet');
const throng = require('throng');

require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV || 'development'
const WORKERS = process.env.WEB_CONCURRENCY || 1
const PORT = process.env.PORT || 8080
const path = require('path');
const rootdir = __dirname;
const PUBLIC_PATH = path.join(rootdir, 'public');

throng({
  workers: WORKERS,
  lifetime: Infinity,
}, start);

function start() {
  const app = express();
  app.use(morgan('combined'));
  app.use(helmet({
    contentSecurityPolicy: false,
  }));
  app.use(compression());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.use(express.static(path.join(__dirname, '/client/build')));
  app.use(express.static(PUBLIC_PATH));
  

  const randomGeojsonController = require('./controllers/randomGeojson')

  app.post('/api/generate-geojson', randomGeojsonController.generateGeojson);

  // The "catch all" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });

  app.listen(PORT);
  console.log(`Server running on ${PORT}`);
}