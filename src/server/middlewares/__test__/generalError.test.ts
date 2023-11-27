import { type Response, type Request } from "express";
import CustomError from "../../CustomError/CustomError";
import { generalError } from "../error/generalError";

describe("Given a generalError middleware", () => {
  describe("Whaen it receives a response", () => {
    const req = {};
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    test("Then it should call it's method status 400", () => {
      const expectedStatusCode = 400;
      const customError = new CustomError("Error", expectedStatusCode);

      generalError(customError, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call it's method status 500", () => {
      const expectedStatusCode = 500;
      const error = new Error("Error with status code");

      generalError(error as CustomError, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then is should call it's method json with a error: Error", () => {
      const expectedMessage = "Error";
      const customError = new CustomError(expectedMessage, 400);

      generalError(customError, req as Request, res as Response, next);

      const errorResponseBody = {
        error: expectedMessage,
      };

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining(errorResponseBody),
      );
    });
  });
});
