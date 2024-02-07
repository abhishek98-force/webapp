const db = require('../../models')

const healthCheck = async (req, res) => {       
    try {
        if(Object.keys(req.body).length != 0 || Object.keys(req.query).length > 0){
        res.status(400).header('Cache-Control', 'no-cache').send();
        } else{
        await db.sequelize.authenticate();
        res.status(200).header('Cache-Control', 'no-cache').send();
        }
        } catch (error) {
        console.log(error);
        res.status(503).header('Cache-Control', 'no-cache').send();
        }

}

module.exports = {
    healthCheck,
}