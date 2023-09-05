import { spawn } from "child_process";
import executeCommand from "../executeCommand";

// Mock child_process spawn method
jest.mock("child_process", () => ({
  spawn: jest.fn(),
}));

describe("executeCommand", () => {
  // Clear all instances and calls to constructor and all methods of mock between each test.
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should resolve when the command exits with code 0", async () => {
    // Mock implementation
    (spawn as jest.Mock).mockImplementation(() => ({
      on: (event, callback) => callback(0),
    }));

    await expect(executeCommand("ls", ["-la"])).resolves.toBeUndefined();
  });

  it("should reject when the command exits with a non-zero code", async () => {
    // Mock implementation
    (spawn as jest.Mock).mockImplementation(() => ({
      on: (event, callback) => callback(1),
    }));

    await expect(executeCommand("ls", ["-la"])).rejects.toThrow(
      "Command failed with exit code 1"
    );
  });
});
