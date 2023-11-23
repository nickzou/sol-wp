import fs from "fs";
import path from "path";
import createDirectory from "../createDirectory";

jest.mock("fs");
jest.mock("path");
jest.mock("@utils/formatMessage/formatMessage", () => {
  return ({ message }: { message: string; color: string }) => message;
});

describe("createDirectory", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should create a folder if it does not exist", () => {
    (path.join as jest.Mock).mockReturnValue("/somePath/someFolder");
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    const result = createDirectory({
      location: "/somePath",
      directoryName: "someFolder",
    });

    expect(fs.mkdirSync).toHaveBeenCalledWith("/somePath/someFolder");
    expect(result).toBe("/somePath/someFolder");
  });

  it("should throw an error if folder already exists", () => {
    (path.join as jest.Mock).mockReturnValue("/somePath/someFolder");
    (fs.existsSync as jest.Mock).mockReturnValue(true);

    expect(() => {
      createDirectory({ location: "/somePath", directoryName: "someFolder" });
    }).toThrowError('Folder "someFolder" already exists.');

    expect(fs.mkdirSync).not.toHaveBeenCalled();
  });
});
