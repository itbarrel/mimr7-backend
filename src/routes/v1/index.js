const express = require('express');

const router = express.Router();

const accountRoute = require('./accounts');
const userRoute = require('./users');


const verifyAccount = require('../../middlewares/verifyAccount');

const routes = [
  { path: '/accounts', routes: [ accountRoute] },
  { path: '/users', routes: [ verifyAccount, userRoute ] },

];

routes.forEach((route) => {
  router.use(route.path, ...route.routes);
});

module.exports = router;
