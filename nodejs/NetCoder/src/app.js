//
// Refs: https://blog.cloudboost.io/adding-swagger-to-existing-node-js-project-92a6624b855b
//       https://levelup.gitconnected.com/swagger-time-to-document-that-express-api-you-built-9b8faaeae563
//

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/controllers/usersController');
const {config, logger, swaggerUi, swaggerSpec} = require('./config/startup');
const _ = require('lodash');

const PORT = process.env.NODE_PORT || config.nodePort;

// Initialize express
var app = express();

//rest API requirements
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// To support JSON-encoded bodies
app.use(bodyParser.json());

logger.debug('Configuration completed !');

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use(
  '/swagger',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

app.use('/api/v1', userRoutes);

// Start the server
const server = app.listen(PORT, () => {
  const host = server.address().address;
  const { port } = server.address();

  logger.info('App listening at http://%s:%s', host, port);
});

module.exports = app;
