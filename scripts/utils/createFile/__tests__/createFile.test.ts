import fs from "fs";
import path from "path";
import createFile from "../createFile";

describe("createFile", () => {
  // Path for temporary directory and file for testing
  const tempDir = "./tempDir";
  const tempFile = "tempFile.txt";
  const filePath = path.join(tempDir, tempFile);

  // Content to write
  const fileContent = "Hello, World!";

  // Clean up: remove temp file and directory if they exist
  afterAll(() => {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    if (fs.existsSync(tempDir)) {
      fs.rmdirSync(tempDir);
    }
  });

  it("throws an error if the directory does not exist", () => {
    expect(() =>
      createFile({
        directoryPath: "./nonexistentDir",
        fileName: tempFile,
        fileContent,
      })
    ).toThrowError(`Directory "./nonexistentDir" does not exist`);
  });

  it("writes a file successfully if the directory exists and the file does not", () => {
    // Make sure file does not exist for this test
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    createFile({ directoryPath: tempDir, fileName: tempFile, fileContent });

    expect(fs.existsSync(filePath)).toBeTruthy();
    expect(fs.readFileSync(filePath, "utf-8")).toBe(fileContent);
  });
});
