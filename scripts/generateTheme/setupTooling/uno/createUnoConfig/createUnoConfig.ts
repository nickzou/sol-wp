import fs from "fs";

interface createUnoConfig {
  content: string[];
  outFile: string;
}

const createUnoConfig = ({ content, outFile }: createUnoConfig) => {
  const fileContent = `import { defineConfig } from 'unocss';\nimport presetUno from 'unocss-preset-uno';
  
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

  fs.writeFileSync("uno.config.ts", fileContent);
};

export default createUnoConfig;
