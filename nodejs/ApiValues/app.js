//
// Refs: https://blog.cloudboost.io/adding-swagger-to-existing-node-js-project-92a6624b855b
//       https://levelup.gitconnected.com/swagger-time-to-document-that-express-api-you-built-9b8faaeae563
//

'use strict';

//mongoose file must be loaded before all other files in order to provide
// models to other modules
var express = require("express"),
  router = express.Router(),
  bodyParser = require("body-parser"),
  swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json"),
  swaggerJSDoc = require("swagger-jsdoc"),
  userRoutes = require("./Routes");

const PORT = process.env.PORT || 3000;

var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/swagger-demo", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  },
  firstName: { type: String },
  lastName: { type: String }
});

mongoose.model("User", UserSchema);
var User = require("mongoose").model("User");

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

// TODO: Option 1
// app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
        url: "http://localhost:3000/api/v1"
      }
    ]
  },
  apis: [
    // jsdoc files to configure swagger.
    "./Models/User.js",
    "./Routes/Index.js"
  ]
};

 const swaggerSpec = swaggerJSDoc(options);

 // router.use("/docs", swaggerUi.serve);
// router.get(
//   "/docs",
//   swaggerUi.setup(swaggerSpec, {
//     explorer: true
//   })
// );

// userRoutes.setup(app);

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {explorer: true}));
app.use("/api/v1", userRoutes);

module.exports = app;

// Start the server
const server = app.listen(PORT, () => {
  const host = server.address().address;
  const { port } = server.address();

  console.log("App listening at http://%s:%s", host, port);
});
