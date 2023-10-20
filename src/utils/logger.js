import winston from "winston";

const loggerDev = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "debug", //info + warn + error
      format: winston.format.colorize({ all: true }),
    }),
  ],
});

const loggerProd = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.colorize({ all: true }),
    }),
    new winston.transports.File({
      filename: "./errors.log",
      level: "error",
      format: winston.format.simple(),
    }),
  ],
});

export const addLogger = (req, res, next) => {
  if (String(process.argv[2]) === "prod") {
    req.logger = loggerProd;
  } else {
    req.logger = loggerDev;
  }

  //loggerDev.debug();

  /* req.logger.info(
    `${req.method} on ${req.url} - ${new Date().toLocaleTimeString()}`
  ); */
  next();
};
