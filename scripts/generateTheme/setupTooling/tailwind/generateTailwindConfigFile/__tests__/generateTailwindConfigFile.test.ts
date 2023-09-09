import generateTailwindConfig from "@generateTheme/setupTooling/tailwind/generateTailwindConfigFile/generateTailwindConfigFile";
import { File } from "@utils/types/File"; // Import this based on your project structure

describe("generateTailwindConfig", () => {
  it("should generate a valid Tailwind config file", () => {
    const content = ["src/**/*.{js,ts,jsx,tsx}", "public/index.html"];

    const result: File = generateTailwindConfig({ content });

    expect(result.name).toBe("tailwind.config.ts");

    const expectedFileContent = `import { Config } from 'tailwindcss';

  const config: Config = {
    content: ${JSON.stringify(content)},
    theme: {
      extend: {},
    },
    plugins: [],
  };
  
  export default config;
  `;

    expect(result.content).toBe(expectedFileContent);
  });
});
