import generateUnoConfigFile from "@generateTheme/setupTooling/uno/generateUnoConfigFile/generateUnoConfigFile"; // Adjust the import path
import { File } from "@utils/types/File"; // Adjust this import path based on your project structure

describe("generateUnoConfigFile", () => {
  it("should generate a valid Uno config file", () => {
    const content = ["src/**/*.{js,ts,jsx,tsx}", "public/index.html"];
    const outFile = "dist/output.css";

    const result: File = generateUnoConfigFile({ content, outFile });

    expect(result.name).toBe("uno.config.ts");

    const expectedFileContent = `import { defineConfig } from 'unocss';\nimport presetUno from '@unocss/preset-uno';
  
  export default defineConfig({
    cli: {
      entry: [
        {
          patterns: ${JSON.stringify(content)},
          outFile: '${outFile}'
        }
      ]
    },
    presets: [
      presetUno(),
    ]
  });
  `;

    expect(result.content).toBe(expectedFileContent);
  });
});
