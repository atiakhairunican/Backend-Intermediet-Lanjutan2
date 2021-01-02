// const appRoot = require("app-root-path");
// const {createLogger, format, transports} = require("winston");
// const {combine, timestamp, label, printf} = format;

// const myformat = printf(({level, message, label, timestamp}) => {
//     return `${timestamp}, ${label}, ${level}, ${message}`;
// });

// // Gunanya buat nyetting log yang akan dikeluarin, baik itu ke file berupa output maupun console terminal 
// const options = {
//     file: {
//         level: 'info',
//         filename: `${appRoot}/logs/your-app.log`,
//         handleExceptions: true,
//         json: true,
//         maxsize: 5242880, //ukuran file maksimal 5MB
//         maxFiles: 5,
//         colorize: true,
//     },
//     console: {
//         level: 'debug',
//         handleExceptions: true,
//         json: false,
//         colorize: true,
//     },
// };

// // Panggil class si winston dengan setting yang udah kita buat
// const logger = createLogger({
//     format: combine(
//         label({label: 'from logger info'}),
//         timestamp(),
//         myformat
//     ),
//     transports: [
//         new winston.transports.File(options.file),
//         new winston.transports.Console(options.console)
//     ],
//     exitOnError: false, // Aplikasi gabakalan berhenti kalo ada exception
// });

// // Bikin file stream (nulis file) yang dimana bakalan dipake sama morgan (sm*ash) ups hahaha.`
// logger.stream = {
//     write: function(message, encoding) {
//         // pake log level info aja supaya outputnya dipake sama file stream dan console.
//         logger.info(message);
//     },
// };

// module.exports = logger;
