import { type Response, type Request, type NextFunction } from "express";
import CustomError from "../../CustomError/CustomError";
import { generalError } from "../error/middlewaresError";

describe("Given a generalError middleware", () => {
  const req = {};
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  describe("When it receives a response", () => {
    test("Then it should call it's method status 400", () => {
      const expectedStatusCode = 400;
      const customError = new CustomError("Error", expectedStatusCode);

      generalError(
        customError,
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call it's method status 500", () => {
      const expectedStatusCode = 500;
      const error = new Error("Error without status code");

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then is should call it's method json with a error: Error", () => {
      const expectedMessage = "Error";
      const customError = new CustomError(expectedMessage, 400);

      generalError(
        customError,
        req as Request,
        res as Response,
        next as NextFunction,
      );

      const errorResponseBody = {
        error: expectedMessage,
      };

      expect(res.json).toHaveBeenCalledWith(errorResponseBody);
    });
  });

  describe("When it dosen't receives a response", () => {
    test("Then it must show the private message in the terminal", () => {
      const expectedStatusCode = 400;
      const privateMessage = "";
      const customError = new CustomError(privateMessage, expectedStatusCode);

      generalError(
        customError,
        req as Request,
        res as Response,
        next as NextFunction,
      );

      const errorResponseBody = {
        error: privateMessage,
      };

      expect(res.json).toHaveBeenCalledWith(errorResponseBody);
    });
  });
});
