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
      const user = await User.findOne({ where: { id: req.params.token } });
  
      if (!user) {
        webappLogger.error("user not found");
        return res.status(404).send();
      }
  
      user.isVerified = true;
      await user.save();
      res.status(200).send();
    } catch (error) {
      console.error(error);
      webappLogger.error("error"+error);
      res.status(400).send();
    }
  });

module.exports = router;