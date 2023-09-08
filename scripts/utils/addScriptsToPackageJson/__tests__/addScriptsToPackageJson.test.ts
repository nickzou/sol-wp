import fs from "fs";
import addScriptsToPackageJson from "../addScriptsToPackageJson"; // Update this path
import { PackageJsonScript } from "../../types/PackageJsonScript"; // Update this path

// Mocking fs module
jest.mock("fs");

describe("addScriptsToPackageJson", () => {
  it("should add scripts to package.json", () => {
    // Setup
    const mockFs = fs as jest.Mocked<typeof fs>;
    mockFs.readFileSync.mockReturnValue(
      JSON.stringify({ scripts: { start: "node index.js" } })
    );
    mockFs.writeFileSync.mockImplementation(() => {});
    const scripts: PackageJsonScript[] = [
      { key: "build", value: "tsc" },
      { key: "test", value: "jest" },
    ];

    // Execute
    addScriptsToPackageJson(scripts);

    // Assert
    const expectedPackageJson = JSON.stringify(
      {
        scripts: {
          start: "node index.js",
          build: "tsc",
          test: "jest",
        },
      },
      null,
      2
    );
    expect(mockFs.writeFileSync).toHaveBeenCalledWith(
      "./package.json",
      expectedPackageJson
    );
  });

  it("should throw an error if unable to read or write to package.json", () => {
    // Setup
    const mockFs = fs as jest.Mocked<typeof fs>;
    mockFs.readFileSync.mockImplementation(() => {
      throw new Error("Read error");
    });

    // Execute and Assert
    expect(() => addScriptsToPackageJson([])).toThrow(
      "Failed to add scripts to package.json"
    );
  });
});
