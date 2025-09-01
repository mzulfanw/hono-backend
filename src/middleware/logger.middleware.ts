import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      singleLine: true
    },
  },
  level: "trace",
});

export const customLogger = (message: string, extra?: Record<string, any>) => {
  if (extra) {
    logger.info(extra, message);
  } else {
    logger.info(message);
  }
};
