import generateTailwindCssFile from "../generateTailwindCssFile";

describe("generateTailwindCssFile", () => {
  it('should generate a file with the name "tailwind.css"', () => {
    const file = generateTailwindCssFile();
    expect(file.name).toBe("tailwind.css");
  });

  it("should generate a file with the correct content", () => {
    const expectedContent = `
@tailwind base;
@tailwind components;
@tailwind utilities;
  `;
    const file = generateTailwindCssFile();
    expect(file.content).toBe(expectedContent);
  });

  it("should return an object of type File", () => {
    const file = generateTailwindCssFile();
    expect(file).toHaveProperty("name");
    expect(file).toHaveProperty("content");
  });
});
