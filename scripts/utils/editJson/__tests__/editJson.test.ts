import * as fs from "fs";
import editJson from "@utils/editJson/editJson"; // Adjust the import to your file structure

jest.mock("fs");

const mockedFs = fs as jest.Mocked<typeof fs>;

describe("readAndStringifyJSONFile", () => {
  it("should add property to JSON", () => {
    const mockJSONData = { key: "value" };
    const mockJSONString = JSON.stringify(mockJSONData);

    mockedFs.readFileSync.mockReturnValue(mockJSONString as any);

    const functionProps = {
      filePath: ".",
      fileName: "example.json",
      edits: { key: "key2", value: "value" },
    };

    const result = editJson(functionProps);

    const mockNewJSONData = { key: "value", key2: "value" };
    const mockNewJSONStringify = JSON.stringify(mockNewJSONData);

    expect(result).toBe(mockNewJSONStringify);
  });

  it("should replace property in JSON", () => {
    const mockJSONData = { key: "value" };
    const mockJSONString = JSON.stringify(mockJSONData);

    mockedFs.readFileSync.mockReturnValue(mockJSONString as any);

    const functionProps = {
      filePath: ".",
      fileName: "example.json",
      edits: { key: "key", value: "new_value" },
    };

    const result = editJson(functionProps);

    const mockNewJSONData = { key: "new_value" };
    const mockNewJSONStringify = JSON.stringify(mockNewJSONData);

    expect(result).toBe(mockNewJSONStringify);
  });

  it("should add property with array to JSON", () => {
    const mockJSONData = { key: "value" };
    const mockJSONString = JSON.stringify(mockJSONData);

    mockedFs.readFileSync.mockReturnValue(mockJSONString as any);

    const functionProps = {
      filePath: ".",
      fileName: "example.json",
      edits: { key: "key2", value: [{ key: "subkey", value: "something" }] },
    };

    const result = editJson(functionProps);

    const mockNewJSONData = { key: "value", key2: [{ subkey: "something" }] };
    const mockNewJSONStringify = JSON.stringify(mockNewJSONData);

    expect(result).toBe(mockNewJSONStringify);
  });

  it("should add string to array in JSON", () => {
    const mockJSONData = { key: "value", key2: [] };
    const mockJSONString = JSON.stringify(mockJSONData);

    mockedFs.readFileSync.mockReturnValue(mockJSONString as any);

    const functionProps = {
      filePath: ".",
      fileName: "example.json",
      edits: { key: "key2", value: ['some_text'] },
    };

    const result = editJson(functionProps);

    const mockNewJSONData = {
      key: "value",
      key2: ['some_text'],
    };

    const mockNewJSONStringify = JSON.stringify(mockNewJSONData);

    expect(result).toBe(mockNewJSONStringify);
  });

  it("should remove strings from array in JSON", () => {
    const mockJSONData = { key: "value", key2: [] };
    const mockJSONString = JSON.stringify(mockJSONData);

    mockedFs.readFileSync.mockReturnValue(mockJSONString as any);

    const functionProps = {
      filePath: ".",
      fileName: "example.json",
      edits: { key: "key2", value: ['some_text', 'some_text'] },
    };

    const result = editJson(functionProps);

    const mockNewJSONData = {
      key: "value",
      key2: ['some_text'],
    };

    const mockNewJSONStringify = JSON.stringify(mockNewJSONData);

    expect(result).toBe(mockNewJSONStringify);
  });

  it("should append to array if array already exists", () => {
    const mockJSONData = {
      key: "value",
      key2: [{ subkey: "something" }],
    };
    const mockJSONString = JSON.stringify(mockJSONData);

    mockedFs.readFileSync.mockReturnValue(mockJSONString as any);

    const functionProps = {
      filePath: ".",
      fileName: "example.json",
      edits: {
        key: "key2",
        value: [{ key: "subkey2", value: "something_else" }],
      },
    };

    const result = editJson(functionProps);

    const mockNewJSONData = {
      key: "value",
      key2: [{ subkey: "something" }, { subkey2: "something_else" }],
    };
    const mockNewJSONStringify = JSON.stringify(mockNewJSONData);

    expect(result).toBe(mockNewJSONStringify);
  });

  it("should throw an error if the file cannot be read", () => {
    const functionProps = {
      filePath: ".",
      fileName: "example.json",
      edits: null,
    };

    mockedFs.readFileSync.mockImplementation(() => {
      throw new Error("File not found");
    });

    expect(() => editJson(functionProps)).toThrow(
      "An error occurred while reading the file. Error: File not found"
    );
  });
});
