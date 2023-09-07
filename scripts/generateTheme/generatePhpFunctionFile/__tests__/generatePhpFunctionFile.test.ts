import generatePhpFunctionFile from "../generatePhpFunctionFile"; // Replace with the actual path to your function file

describe("generatePhpFunctionFile", () => {
  it("should generate a PHP file with the specified function name and body", () => {
    const params = {
      name: "myFunction",
      functionBody: 'echo "Hello, world!";',
    };

    const result = generatePhpFunctionFile(params);

    const expectedContent = `<?php
function myFunction() {
  echo "Hello, world!";
}`;

    expect(result.name).toBe("myFunction.php");
    expect(result.content).toBe(expectedContent);
  });

  it("should generate a PHP file with a custom file name if provided", () => {
    const params = {
      name: "myFunction",
      fileName: "customFileName",
      functionBody: 'echo "Hello, world!";',
    };

    const result = generatePhpFunctionFile(params);

    expect(result.name).toBe("customFileName.php");
  });
});
