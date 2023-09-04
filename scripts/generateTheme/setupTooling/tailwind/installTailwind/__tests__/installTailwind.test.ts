import { exec } from "child_process";
import installTailwind from "../installTailwind"; // replace with the actual path to your function

jest.mock("child_process");

describe("installTailwind", () => {
  let execMock: jest.Mock;

  beforeEach(() => {
    execMock = exec as unknown as jest.Mock;
    execMock.mockClear();
  });

  it("should handle success", () => {
    execMock.mockImplementation((command, callback) => {
      (callback as any)(null, "success message", "");
      return null;
    });

    const logSpy = jest.spyOn(console, "log").mockImplementation();
    installTailwind();
    expect(logSpy).toHaveBeenCalledWith("Standard Output: \nsuccess message");
    logSpy.mockRestore();
  });

  it("should handle errors", () => {
    execMock.mockImplementation((command, callback) => {
      (callback as any)(new Error("Test error"), null, null);
      return null;
    });

    const errorSpy = jest.spyOn(console, "error").mockImplementation();
    installTailwind();
    expect(errorSpy).toHaveBeenCalledWith(
      "Error executing command: Test error"
    );
    errorSpy.mockRestore();
  });

  it("should handle standard error", () => {
    execMock.mockImplementation((command, callback) => {
      (callback as any)(null, null, "stderr message");
      return null;
    });

    const errorSpy = jest.spyOn(console, "error").mockImplementation();
    installTailwind();
    expect(errorSpy).toHaveBeenCalledWith("Standard Error: stderr message");
    errorSpy.mockRestore();
  });
});
