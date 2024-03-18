const express = require('express');
const app = express();
var winston = require('winston'),
    expressWinston = require('express-winston');
const db = require('./models');;
const port = process.env.PORT || 8000;

const user = require('./src/routes/user');

const health = require('./src/controllers/health');


app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
    app.use(expressWinston.logger({
        transports: [
        new winston.transports.File({
            filename : '/var/log/csye6225/webapp.log',
        })
        ],
        format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
        winston.format.prettyPrint()
        ),
        meta: true, // optional: control whether you want to log the meta data about the request (default to true)
        msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
        expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
        colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
        ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
    }));
}


app.use('/v1/user', user);
app.get('/healthz', health.healthCheck);
app.all('/healthz', async (req, res) => {
    res.status(405).header('Cache-Control','no-cache').send();
})

if (process.env.NODE_ENV !== 'test') {
    app.use(expressWinston.errorLogger({
        transports: [
            new winston.transports.File({
            filename : '/var/log/csye6226/errorWebapp.log',
            })
        ],
        format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
        winston.format.prettyPrint()
        ),
        meta: true, // optional: control whether you want to log the meta data about the request (default to true)
        msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
        expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
        colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
        ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response

    }));
}

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

