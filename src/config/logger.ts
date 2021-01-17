import { LoggerOptions, format, transports } from 'winston';

interface LoggerConfig {
  driver: 'winston';

  config: {
    winston: LoggerOptions;
  };
}

export default {
  driver: 'winston',

  config: {
    winston: {
      format: format.combine(format.colorize(), format.simple()),
      transports: [
        new transports.Console({
          level: 'info',
        }),
      ],
    },
  },
} as LoggerConfig;
