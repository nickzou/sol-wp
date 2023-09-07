import generatePhpFunctionFile from "../generatePhpFunctionFile";

describe("generatePhpFunctionFile", () => {
  it("should generate a PHP function file with the given name and body", () => {
    const result = generatePhpFunctionFile({
      name: "myFunction",
      functionBody: 'echo "Hello, World!";',
    });

    expect(result).toEqual({
      name: "myFunction.php",
      functionName: "myFunction",
      content: `<?php
function myFunction() {
  echo "Hello, World!";
}`,
    });
  });

  it("should use fileName if provided", () => {
    const result = generatePhpFunctionFile({
      name: "myFunction",
      fileName: "customFileName",
      functionBody: 'echo "Hello, World!";',
    });

    expect(result).toEqual({
      name: "customFileName.php",
      functionName: "myFunction",
      content: `<?php
function myFunction() {
  echo "Hello, World!";
}`,
    });
  });

  it("should handle empty function body", () => {
    const result = generatePhpFunctionFile({
      name: "emptyFunction",
      functionBody: "",
    });

    expect(result).toEqual({
      name: "emptyFunction.php",
      functionName: "emptyFunction",
      content: `<?php
function emptyFunction() {
  
}`,
    });
  });
});
