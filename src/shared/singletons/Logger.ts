import winston, { Logger } from 'winston';
import loggerConfig from '@config/logger';


const logger: Logger = winston.createLogger(loggerConfig.config.winston);

logger.on("throw", (msg: string) => {
    throw new Error(msg);
});

export default logger;
