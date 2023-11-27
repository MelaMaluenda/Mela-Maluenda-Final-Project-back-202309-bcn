import { type Request, type Response } from "express";
import CustomError from "../../CustomError/CustomError";
import { notFound } from "../error/generalError.js";

describe("Given a notFound middleware", () => {
  describe("When it receives a next function", () => {
    test("Then it should call the next function", () => {
      const req = {};
      const res = {};
      const next = jest.fn();

      const expectedError = new CustomError("Endpoint", 404);

      notFound(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
