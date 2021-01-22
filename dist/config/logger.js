"use strict";
exports.__esModule = true;
var winston_1 = require("winston");
exports["default"] = {
    driver: 'winston',
    config: {
        winston: {
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
            transports: [
                new winston_1.transports.Console({
                    level: process.env.LOG_LEVEL || 'info'
                }),
            ]
        }
    }
};
