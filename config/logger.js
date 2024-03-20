const winston = require('winston');
const {combine, timestamp, json, errors } = winston.format

const logFilePath = process.env.NODE_ENV === 'test' ? './webapp.log' : '/var/log/csye6225/webapp.log';

winston.loggers.add('webappLogger',{
    level: 'debug',
    format: combine(
        timestamp({format: "YYYY-MM-DD HH:mm:ss.sss"}),
        json(),
    ),
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({ 
            filename : logFilePath
        }),
    ]
});

