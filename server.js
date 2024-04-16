const express = require('express');
const app = express();
var winston = require('winston'),
    expressWinston = require('express-winston');
const db = require('./models');;
const port = process.env.PORT || 8000;

const user = require('./src/routes/user');
const verificationRoute = require('./src/routes/verificationRoute');
const health = require('./src/controllers/health');


app.use(express.json());


app.use('/v2/user', user);
app.use('/verify', verificationRoute)
app.get('/healthz', health.healthCheck);
app.all('/healthz', async (req, res) => {
    res.status(405).header('Cache-Control','no-cache').send();
})


app.use((err, req, res, next) => {
    console.log("Middleware Error Hadnling");
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    console.log(errMsg);
    res.status(400).send(errMsg);
});



app.use((req, res, next) => {
    res.status(404).send();
})  



const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

db.sequelize.sync()
.then(()=> console.log('Databae and db created'));


module.exports = server;

