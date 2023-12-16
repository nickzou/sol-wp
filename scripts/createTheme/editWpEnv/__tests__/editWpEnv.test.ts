import fs from "fs";
import editWpEnv from "../editWpEnv";

// Mock the fs module
jest.mock("fs");

describe("editWpEnv", () => {
  afterEach(() => {
    // Reset the mock implementations before each test
    jest.resetAllMocks();
  });

  it("should throw an error if the file does not exist", () => {
    (fs.readFileSync as jest.Mock).mockReturnValue(null);

    expect(() =>
      editWpEnv({ wpEnvFile: "test.json", directory: "some-dir" })
    ).toThrowError();
  });

  it("should throw an error if directory is already mapped", () => {
    const fileContent = JSON.stringify({
      mappings: {
        "wp-content/themes/some-dir": "some-value",
      },
    });

    (fs.readFileSync as jest.Mock).mockReturnValue(fileContent);

    expect(() =>
      editWpEnv({ wpEnvFile: "test.json", directory: "some-dir" })
    ).toThrowError();
  });

  it("should add new directory mapping", () => {
    const initialContent = JSON.stringify({
      mappings: {},
    });

    const expectedContent = JSON.stringify(
      {
        mappings: {
          "wp-content/themes/some-dir": "./wp/themes/some-dir",
        },
      },
      null,
      2
    );

    (fs.readFileSync as jest.Mock).mockReturnValue(initialContent);

    editWpEnv({ wpEnvFile: "test.json", directory: "some-dir" });

    expect(fs.writeFileSync).toHaveBeenCalledWith("test.json", expectedContent);
  });
});
