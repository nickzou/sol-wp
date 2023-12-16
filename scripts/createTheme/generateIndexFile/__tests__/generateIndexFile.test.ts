import generateIndexFile from "../generateIndexFile";

describe("generatePhpFile", () => {
  it("should return an object with correct name and content", () => {
    const generatedFile = generateIndexFile();

    // Check if name is 'index.php'
    expect(generatedFile.name).toBe("index.php");

    // Check for existence of some unique PHP tags in the content
    expect(generatedFile.content).toContain("<?php language_attributes(); ?>");
    expect(generatedFile.content).toContain("<?php wp_title(); ?>");
    expect(generatedFile.content).toContain("<?php wp_head(); ?>");
    expect(generatedFile.content).toContain("<?php body_class(); ?>");

    // You can add more checks based on what you expect to find in the generated content
  });
});
