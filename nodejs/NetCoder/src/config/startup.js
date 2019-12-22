"use strict";

const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const structuredLog = require("structured-log");
const mongoose = require("mongoose");
const _ = require("lodash");
const configFile = require("./config.json");

const defaultConfig = configFile.development;
const environment = process.env.NODE_ENV || "development";
const environmentConfig = configFile[environment];
const config = _.merge(defaultConfig, environmentConfig);

// Logging and traces
const logger = structuredLog
  .configure()
  .minLevel.verbose()
  .writeTo(new structuredLog.ConsoleSink())
  .create(true);

// MongoDB
logger.verbose("Configuring Mongo dB...");

// mongoose file must be loaded before all other files in order to provide
// models to other modules
let user = null;

mongoose.connect(config.mongodbConnectionString, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

logger.verbose("Done !");

// Swagger
// Ref: https://levelup.gitconnected.com/swagger-time-to-document-that-express-api-you-built-9b8faaeae563
// Swagger set up
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Time to document that Express API you built",
      version: "1.0.0",
      description:
        "A test project to understand how easy it is to document and Express API",
      license: {
        name: "MIT",
        url: "https://choosealicense.com/licenses/mit/"
      },
      contact: {
        name: "Swagger",
        url: "https://swagger.io",
        email: "jlguerrero@gmail.com"
      }
    },
    servers: [
      {
        url: `http://localhost:${config.nodePort}/api/v1`
      }
    ]
  },
  apis: [
    // jsdoc files to configure swagger.
    "../application/models/User.js",
    "../routes/controllers/usersController.js"
  ]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  config,
  logger,
  mongoose,
  swaggerUi,
  swaggerSpec
};
