const winston = require('winston');
const {combine, timestamp, json, errors } = winston.format

winston.loggers.add('webappLogger',{
    level: 'debug',
    format: combine(
        timestamp({format: "YYYY-MM-DD HH:mm:ss.sss"}),
        json(),
    ),
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({ 
            filename : '/var/log/csye6225/webapp.log'
        }),
    ]
});

