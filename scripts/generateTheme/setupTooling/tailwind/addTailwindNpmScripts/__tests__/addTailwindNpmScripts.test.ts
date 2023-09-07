import fs from "fs";
import addTailwindNpmScripts from "../addTailwindNpmScripts";

jest.mock("fs");

describe("addTailwindNpmScripts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should add Tailwind scripts to package.json", () => {
    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify({
        scripts: {},
      })
    );

    const writeFileSyncMock = fs.writeFileSync as jest.Mock;

    addTailwindNpmScripts();

    expect(writeFileSyncMock).toHaveBeenCalled();

    const [filePath, content] = writeFileSyncMock.mock.calls[0];
    expect(filePath).toBe("./package.json");

    const updatedPackageJson = JSON.parse(content);
    expect(updatedPackageJson.scripts).toHaveProperty("tailwind");
    expect(updatedPackageJson.scripts).toHaveProperty("tailwind:prod");
    expect(updatedPackageJson.scripts).toHaveProperty("tailwind:watch");
  });

  it("should throw an error if script keys already exist", () => {
    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify({
        scripts: {
          tailwind: "some-command",
        },
      })
    );

    expect(() => addTailwindNpmScripts()).toThrow(
      /Script key "tailwind" already exists/
    );
  });
});
