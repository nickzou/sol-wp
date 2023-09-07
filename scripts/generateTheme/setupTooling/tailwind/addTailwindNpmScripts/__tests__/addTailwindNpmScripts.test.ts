import fs from "fs";
import addTailwindNpmScripts from "../addTailwindNpmScripts"; // Replace with actual import

const mockedFs = fs as jest.Mocked<typeof fs>;

jest.mock("fs", () => ({
  readFileSync: jest.fn(),
  writeFileSync: jest.fn(),
}));

describe("addTailwindNpmScripts", () => {
  it("should add Tailwind scripts to package.json successfully", () => {
    mockedFs.readFileSync.mockReturnValueOnce(
      JSON.stringify({
        scripts: {},
      })
    );

    const themeFolder = "myTheme";

    addTailwindNpmScripts(themeFolder);

    expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
      "./package.json",
      JSON.stringify(
        {
          scripts: {
            tailwind: `tailwindcss -i ./src/css/tailwind.css -o ./wp/themes/${themeFolder}/css/tailwind.css`,
            "tailwind:prod": `tailwindcss -i ./src/css/tailwind.css -o ./wp/themes/${themeFolder}/css/tailwind.css --minify`,
            "tailwind:watch": `tailwindcss -i ./src/css/tailwind.css -o ./wp/themes/${themeFolder}/css/tailwind.css --watch`,
          },
        },
        null,
        2
      )
    );
  });

  it("should throw an error if a Tailwind script key already exists", () => {
    mockedFs.readFileSync.mockReturnValueOnce(
      JSON.stringify({
        scripts: {
          tailwind: "some existing command",
        },
      })
    );

    expect(() => addTailwindNpmScripts("myTheme")).toThrowError();
  });
});
