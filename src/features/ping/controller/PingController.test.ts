import type { Request, Response } from "express";
import PingController from "./PingController";

describe("Given a PingController's getPong method", () => {
  describe("When it receives a response", () => {
    const pingController = new PingController();
    const mockStatus = jest.fn().mockReturnThis();

    const req = {};
    const mockResponse: Pick<Response, "status" | "json"> = {
      status: mockStatus,
      json: jest.fn(),
    };

    test("Then it should call it's method status with 200", () => {
      const expectedStatusCode = 200;

      pingController.getPong(req as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenLastCalledWith(expectedStatusCode);
    });

    test("Then is should call it's method with a message: 🏓", () => {
      const expectedMessage = { message: "🏓" };

      pingController.getPong(req as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(expectedMessage);
    });
  });
});
