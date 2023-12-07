import { type NextFunction, type Request, type Response } from "express";
import debugCreator from "debug";
import CustomError from "../../CustomError/CustomError.js";
import chalk from "chalk";
import { ValidationError } from "express-validation";

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
  if (error instanceof ValidationError && error.details.body) {
    const validationError = error.details.body.reduce(
      (errorMessage, joiError) => `${errorMessage}, ${joiError.message}`,
      "",
    );

    const validationErrorModified = validationError
      ?.replace(/,(\s)/, "")
      .replaceAll(/['"]+/g, "");

    (error as CustomError).privateMessage = validationErrorModified;
    (error as CustomError).message = validationErrorModified;

    debug(chalk.red(validationError));
  }

  const statusCode = error.statusCode ?? 500;
  const privatMessage = error.privateMessage ?? error.message;

  debug(chalk.red(`Error: ${privatMessage}`));

  res.status(statusCode).json({ error: error.message });
};
