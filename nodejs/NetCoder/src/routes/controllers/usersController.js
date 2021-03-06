'use strict';

// Node Modules
const express = require('express');
const service = require('../../application/services/usersService');
const User = require('../../application/models/User');
// const {mongoose} = require('../../config/startup');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * path:
 *  /users/:
 *    post:
 *      summary: Create a new user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        '200':
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.post('/users', (req, res, next) => {
  const { email, name } = req.body;
  const user = new User(name, email);

  service.createUser();

  res.json(user);
});

/**
 * @swagger
 * path:
 *  /users/:
 *    get:
 *      summary: Get all users
 *      tags: [Users]
 *      responses:
 *        '200':
 *          description: An array of users
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.get('/users', (req, res, next) => {
  const userOne = new User('Alexander', 'fake@gmail.com');
  const userTwo = new User('Ryan', 'fakeagain@gmail.com');
  res.json({ userOne, userTwo });
});

// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error Handler
router.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

module.exports = router;
