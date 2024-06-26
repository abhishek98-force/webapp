const express = require('express');
const {User} = require('../../models');
//comment
const router = express.Router();

require("../../config/logger");
const winston = require("winston");
const webappLogger = winston.loggers.get("webappLogger");

router.get('/:token', async (req, res) => {
    try {
      console.log(req.params.token);
      const user = await User.findOne({ where: { token: req.params.token } });
  
      if (!user) {
        webappLogger.error("user not found");
        return res.status(404).send('<h1>User not found</h1>');
      }

      if (user.tokenExpiration && new Date() > user.tokenExpiration) {
        webappLogger.error("token expired");
        return res.status(400).send('<h1>Verification failed: token expired</h1>');
      }
  
      user.isVerified = true;
      await user.save();
      res.status(200).send('<h1>User verified successfully</h1>');
    } catch (error) {
      console.error(error);
      webappLogger.error("error"+error);
      res.status(400).send();
    }
  });

module.exports = router;