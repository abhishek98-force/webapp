const db = require('../../models')
require("../../config/logger");
const winston = require("winston");
const webappLogger = winston.loggers.get("webappLogger");

const healthCheck = async (req, res) => {    
    webappLogger.info("request started for health check");   
    try {
        if(Object.keys(req.body).length != 0 || Object.keys(req.query).length > 0){
        res.status(400).header('Cache-Control', 'no-cache').send();
        } else{
        await db.sequelize.authenticate();
        console.log("hello");
        res.status(200).header('Cache-Control', 'no-cache').send();
        }
        } catch (error) {
        console.log(error);
        webapLogger.error("error in health check");
        res.status(503).header('Cache-Control', 'no-cache').send();
        }

}

module.exports = {
    healthCheck,
}