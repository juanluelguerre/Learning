"use strict";

var startup = require('../../config/startup');
// var mongo = startup.mongo;

class usersService {
  constructor(logger, mongo) {
    this.logger = logger;
    this.mongo = mongo;    
  }

  createUser(user) {
      this.logger.info(`User ${user.name} creadte !`);
  }

  getUsers(user) {
    this.logger.info(`Geting all users!`);
  }

  getUser(userId) {
    this.logger.info(`Getting user with id ${userId} !`);
  }
}

module.exports = usersService;