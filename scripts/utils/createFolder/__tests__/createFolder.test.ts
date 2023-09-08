import fs from "fs";
import path from "path";
import createFolder from "../createFolder"; // Adjust the path to match your actual file structure
import formatMessage from "../../formatMessage/formatMessage"; // Adjust the path to match your actual file structure

// Mocking fs module
jest.mock("fs", () => ({
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
}));

// Mocking path module
jest.mock("path", () => ({
  join: jest.fn((...args) => args.join("/")),
}));

// Mocking formatMessage function
jest.mock("../../formatMessage/formatMessage.ts", () => jest.fn());

describe("createFolder", () => {
  let existsSyncMock: jest.Mock;
  let mkdirSyncMock: jest.Mock;
  let formatMessageMock: jest.Mock;
  let joinMock: jest.Mock;

  beforeEach(() => {
    existsSyncMock = fs.existsSync as unknown as jest.Mock;
    mkdirSyncMock = fs.mkdirSync as unknown as jest.Mock;
    formatMessageMock = formatMessage as unknown as jest.Mock;
    joinMock = path.join as unknown as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if folder already exists", () => {
    existsSyncMock.mockReturnValue(true);

    // Add a return value for formatMessageMock for debugging.
    formatMessageMock.mockReturnValue(
      'red: Folder "existingFolder" already exists.'
    );

    try {
      createFolder("existingFolder");
    } catch (e) {
      expect(e.message).toEqual('red: Folder "existingFolder" already exists.');
    }

    expect(formatMessageMock).toHaveBeenCalledWith({
      message: 'Folder "existingFolder" already exists.',
      color: "red",
    });
  });

  it("should create a folder if it does not exist", () => {
    existsSyncMock.mockReturnValue(false);

    const folderName = "newFolder";
    const result = createFolder(folderName);

    expect(result).toBe("wp/themes/newFolder");
    expect(mkdirSyncMock).toHaveBeenCalledWith("wp/themes/newFolder");
    expect(formatMessageMock).toHaveBeenCalledWith({
      message: 'Folder "newFolder" has been created.',
      color: "green",
    });
  });
});
