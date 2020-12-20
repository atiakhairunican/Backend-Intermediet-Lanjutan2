// /* eslint-disable no-unused-vars */
// /* eslint-disable no-undef */
// const path = require('path')
// require('dotenv').config({path : path.resolve(__dirname + '/.env')})
// const express = require("express")
// const server = express()
// const morgan = require("morgan")
// const bodyPars = require("body-parser")
// const db = require("./src/Configs/db")
// const router = require("./src/main")
// const cors = require("cors")
// const redis = require("./src/Configs/redis")
// const fs = require("fs")
// // const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// const winston = require('winston');

// const logger = winston.createLogger({
//     level: 'info',
//     format: winston.format.json(),
//     defaultMeta: { service: 'user-service' },
//     transports: [
//         new winston.transports.File({ filename: 'error.log', level: 'error' }),
//         new winston.transports.File({ filename: 'combined.log' }),
//     ],
// });

// if (process.env.NODE_ENV !== 'production') {
//     logger.add(new winston.transports.Console({
//         format: winston.format.simple(),
//     }));
// }

// // const winston = require("./src/Configs/winston")
// // const log = require('simple-node-logger').createSimpleLogger();
// // const opts = {
// //     errorEventName:'error',
// //         logDirectory:'D:/Belajar/Arkademy/DevOps Engineer/Materi/tugas/Pertemuan9/backend/mylogfiles',
// //         fileNamePattern:'roll-<DATE>.log',
// //         dateFormat:'YYYY.MM.DD'
// // };
// // const log = require('simple-node-logger').createRollingFileLogger( opts );
// // log.info('Logged info');
// // log.error('Logged error')

// server.use(bodyPars.urlencoded({extended: false}))
// server.use(bodyPars.json())
// // server.use(morgan('combined', { stream: accessLogStream }))
// // server.use(morgan('combined', { stream: winston.stream }));
// server.use(morgan("dev"))
// server.use(cors())
// server.use("/public", express.static("public"))
// server.use(router)

// redis.redisCheck()
//     .then((res) => {
//         console.log(res)
//     })
//     .catch((err) => {
//         console.log(err)
//     })

// db.connect()
//     .then((res) => {
//         console.log("Database connect")
//     }).catch((err) => {
//         console.log("Database not connected")
//         console.log(err)
//     });

// // // error handler
// // server.use(function(err, req, res, next) {
// //     // set locals, only providing error in development
// //     res.locals.message = err.message;
// //     res.locals.error = req.app.get('env') === 'development' ? err : {};

// //     // add this line to include winston logging
// //     winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

// //     // render the error page
// //     res.status(err.status || 500);
// //     res.render('error');
// // });

// server.listen(9000, () => {
//     console.log("Service running on port 9000")
// })