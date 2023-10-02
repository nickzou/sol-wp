import fs from "fs";
import path from "path";
import editJson from "../editJson";

jest.mock("fs");
jest.mock("path");

describe("editJson", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should correctly edit json content with provided edits for non-array values", () => {
    (path.resolve as jest.Mock).mockReturnValue("/somePath/someFile.json");
    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify({ someKey: "oldValue" })
    );

    const edits = { key: "someKey", value: "newValue" };
    const result = editJson({
      filePath: "/somePath",
      fileName: "someFile.json",
      edits,
    });

    expect(result.name).toBe("someFile.json");
    expect(result.content).toBe(
      JSON.stringify({ someKey: "newValue" }, null, "\t")
    );
  });

  // ... Add more test cases for array edits, merging arrays, etc.

  it("should throw an error if reading the file fails", () => {
    (path.resolve as jest.Mock).mockReturnValue("/somePath/someFile.json");
    (fs.readFileSync as jest.Mock).mockImplementation(() => {
      throw new Error("Read file error");
    });

    const edits = { key: "someKey", value: "newValue" };

    expect(() => {
      editJson({ filePath: "/somePath", fileName: "someFile.json", edits });
    }).toThrowError(
      "An error occurred while reading the file. Error: Read file error"
    );
  });
});
