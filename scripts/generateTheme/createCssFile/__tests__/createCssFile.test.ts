import createCssFile from "../createCssFile";

describe("createCssFile", () => {
  it("should return an object with the correct name and content", () => {
    const themeName = "MyTheme";
    const cssFile = createCssFile(themeName);

    // Check if name is correct
    expect(cssFile.name).toBe(`style.css`);

    // Check if content contains important fields
    expect(cssFile.content).toContain(`Theme Name: ${themeName}`);
    expect(cssFile.content).toContain("Author: Your Name");
    expect(cssFile.content).toContain("Description: My first WordPress theme");
    expect(cssFile.content).toContain("Version: 1.0");
  });
});
