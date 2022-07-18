const models = require('../models');
const ResourceService = require('./resource');

class AccountService extends ResourceService {
  constructor() {
    super(models.Account);
  }
}

module.exports = new AccountService();
