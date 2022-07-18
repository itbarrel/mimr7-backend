const { AccountService } = require('../services');
const storage = require('../utils/cl-storage');

const verifyAccount = async (req, res, next) => {
  storage.run(async () => {
    try {
      const account = await AccountService.findByQuery({
        apikey: req.headers.authorization,
      }, true);
      if (account) {
        storage.set('account', account);
        next();
      } else {
        next(new Error(' Account Not Found'));
      }
    } catch (error) {
      next(error);
    }
  });
};

module.exports = verifyAccount;
