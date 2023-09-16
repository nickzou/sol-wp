import installNpmPackages from "@utils/installNpmPackages/installNpmPackages";
import executeCommand from "@utils/executeCommand/executeCommand";

// Mock the executeCommand function
jest.mock("@utils/executeCommand/executeCommand", () => {
  return jest.fn();
});

describe("installNpmPackages", () => {
  it("should call executeCommand with npm install and provided packages", async () => {
    const mockExecuteCommand = executeCommand as jest.MockedFunction<
      typeof executeCommand
    >;

    const packages = ["package1", "package2"];

    await installNpmPackages(packages);

    expect(mockExecuteCommand).toHaveBeenCalledWith("npm", [
      "install",
      "package1",
      "package2",
      "--save-dev",
    ]);
  });

  it("should call executeCommand with npm install and no packages if none provided", async () => {
    const mockExecuteCommand = executeCommand as jest.MockedFunction<
      typeof executeCommand
    >;

    await installNpmPackages();

    expect(mockExecuteCommand).toHaveBeenCalledWith("npm", [
      "install",
      "--save-dev",
    ]);
  });
});
