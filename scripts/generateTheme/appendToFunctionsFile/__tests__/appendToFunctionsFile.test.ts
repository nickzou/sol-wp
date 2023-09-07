import fs from "fs";
import appendToFunctionsFile from "../appendToFunctionsFile";

jest.mock("fs");

describe("appendToFunctionsFile", () => {
  it("should append the function to functions.php", () => {
    const mockReadFileSync = fs.readFileSync as jest.MockedFunction<
      typeof fs.readFileSync
    >;
    const mockWriteFileSync = fs.writeFileSync as jest.MockedFunction<
      typeof fs.writeFileSync
    >;

    // Mock the reading of the functions.php file to simulate its content
    mockReadFileSync.mockReturnValueOnce("<?php\n// some code\n?>");

    // Define parameters to be used in the test
    const params = {
      themeFolder: "my-theme",
      functionName: "myFunction",
    };

    // Call the function
    appendToFunctionsFile(params);

    // Verify the write operation
    const expectedNewContent =
      "<?php\n// some code\nrequire_once get_template_directory() . '/functions/myFunction.php'\n?>";
    expect(mockWriteFileSync).toHaveBeenCalledWith(
      "./wp/themes/my-theme/functions.php",
      expectedNewContent,
      "utf-8"
    );
  });

  it("should throw an error if closing tag is not found", () => {
    const mockReadFileSync = fs.readFileSync as jest.MockedFunction<
      typeof fs.readFileSync
    >;

    // Mock the reading of the functions.php file to simulate its content without closing tag
    mockReadFileSync.mockReturnValueOnce("<?php\n// some code\n");

    const params = {
      themeFolder: "my-theme",
      functionName: "myFunction",
    };

    // Expect an error to be thrown
    expect(() => appendToFunctionsFile(params)).toThrow(
      /Could not find the closing tag/
    );
  });
});
