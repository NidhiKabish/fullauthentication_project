const express = require('express'),
      auth    = require('../controller/auth_controller'),
      authMiddleware  = require('../middleware/auth_middleware'),
      router  = express.Router();




router.post('/signup',auth.signup);
router.post('/login',auth.login);
router.get('/dashboard', authMiddleware, auth.dashboard);

// router.get('/logout',auth.logout);




module.exports = router;