import { type NextFunction, type Request, type Response } from "express";
import debugCreator from "debug";
import CustomError from "../../CustomError/CustomError.js";
import chalk from "chalk";

const debug = debugCreator("streetphotography: server: generalError");

export const notFound = (_req: Request, res: Response, next: NextFunction) => {
  const customError = new CustomError(
    "Endpoint not found",
    404,
    "Endpoint not found",
  );
  next(customError);
};

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = error.statusCode ?? 500;
  const privatMessage = error.privateMessage ?? error.message;

  debug(chalk.red(`Error: ${privatMessage}`));

  res.status(statusCode).json({ error: error.message });
};
