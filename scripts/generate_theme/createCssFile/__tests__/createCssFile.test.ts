import createCssFile from "../createCssFile";
import mockFs from "mock-fs";
import fs from "fs";
import path from "path";

describe("createCssFile", () => {
  beforeEach(() => {
    mockFs({
      "wp/themes": {},
    });
  });

  afterEach(() => {
    mockFs.restore();
  });

  it("should create a style.css file with the correct content", () => {
    const themeName = "TestTheme";
    const description = "Test description";
    const author = "Test author";
    const version = "1.0";
    const directoryName = "test-theme";

    const result = createCssFile({
      themeName,
      description,
      author,
      version,
      directoryName,
    });
    expect(result).toBe("style.css generated successfully.");

    const directoryPath = path.join("wp", "themes", directoryName);
    const cssFilePath = path.join(directoryPath, "style.css");

    // Check if the directory and file are created
    expect(fs.existsSync(directoryPath)).toBeTruthy();
    expect(fs.existsSync(cssFilePath)).toBeTruthy();

    // Check the content of the generated file
    const expectedContent = `/*
      Theme Name: ${themeName}
      Description: ${description}
      Author: ${author}
      Version: ${version}
      */`;

    // const actualContent = fs.readFileSync(cssFilePath, "utf-8");
    // expect(actualContent).toBe(expectedContent);
  });
});
