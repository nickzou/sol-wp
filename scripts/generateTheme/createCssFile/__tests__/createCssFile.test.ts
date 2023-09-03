import createCssFile from "../createCssFile";

describe("createCssFile", () => {
  it("should return an object with the correct name and content", () => {
    const themeName = "MyTheme";
    const themeAuthor = "Myself";
    const themeDescription = "This is a theme description.";
    const themeVersion = "0.1.4";

    const cssFile = createCssFile({
      name: themeName,
      author: themeAuthor,
      description: themeDescription,
      version: themeVersion,
    });

    // Check if name is correct
    expect(cssFile.name).toBe(`style.css`);

    // Check if content contains important fields
    expect(cssFile.content).toContain(`Theme Name: ${themeName}`);
    expect(cssFile.content).toContain(`Author: ${themeAuthor}`);
    expect(cssFile.content).toContain(`Description: ${themeDescription}`);
    expect(cssFile.content).toContain(`Version: ${themeVersion}`);
  });
});
