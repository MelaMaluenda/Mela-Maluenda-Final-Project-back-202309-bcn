import { type NextFunction, type Request, type Response } from "express";
import debugCreator from "debug";
import CustomError from "../../CustomError/CustomError.js";
import chalk from "chalk/index.js";

export const notFound = (_req: Request, res: Response, next: NextFunction) => {
  const debug = debugCreator("streetphotography: server: generalError");
  debug(chalk.red("Endpoint not found"));

  const customError = new CustomError("Endpoint no found", 404);
  next(customError);
};

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = error.statusCode ?? 500;

  res.status(statusCode).json({ error: error.message });
};
