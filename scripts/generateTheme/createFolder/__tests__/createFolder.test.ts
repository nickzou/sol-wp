import * as fs from "fs";
import * as path from "path";
import createFolder from "../createFolder";

describe("createFolder", () => {
  const testFolderPath = path.join("wp/themes", "test-folder");

  // Remove test folder if it exists, before running tests
  beforeAll(() => {
    if (fs.existsSync(testFolderPath)) {
      fs.rmdirSync(testFolderPath);
    }
  });

  // Remove test folder after tests are done
  afterAll(() => {
    if (fs.existsSync(testFolderPath)) {
      fs.rmdirSync(testFolderPath);
    }
  });

  it("should create a folder if it does not exist", () => {
    const result = createFolder("test-folder");
    expect(result).toBe("wp/themes/test-folder");
    expect(fs.existsSync(testFolderPath)).toBe(true);
  });

  it("should throw error if the folder already exists", () => {
    expect(() => createFolder("test-folder")).toThrow(
      'Folder "test-folder" already exists.'
    );
  });
});
