import generateFunctionsFile from "../generateFunctionsFile";

describe("generateFunctionsFile", () => {
  it("should return a File object with the correct name and content", () => {
    const expectedContent = `<?php
  //Functions go here;
  ?>`;
    const result = generateFunctionsFile();

    expect(result.name).toBe("functions.php");
    expect(result.content).toBe(expectedContent);
  });
});
