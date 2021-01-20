"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
exports.default = {
    driver: 'winston',
    config: {
        winston: {
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
            transports: [
                new winston_1.transports.Console({
                    level: 'info',
                }),
            ],
        },
    },
};
