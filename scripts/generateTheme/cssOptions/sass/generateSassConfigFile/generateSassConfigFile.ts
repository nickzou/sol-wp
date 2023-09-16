import { File } from "@utils/types/File";

interface generateSassConfigFile {
  themeFolder: string;
}

const generateSassConfigFile = ({
  themeFolder,
}: generateSassConfigFile): File => {
  const fileContent = `import * as sass from "sass";
  import glob from "glob";
  import { parse } from "path";
  import { existsSync, mkdir, writeFile } from "fs";
  import { green } from "colorette";
  
  const files = glob.sync(\`./src/css/**/*.scss\`);
  
  const outputDir = \`wp/themes/${themeFolder}/css\`;
  
  const minifyFlag = process.argv.filter((a) => a.includes("--minify"));
  const sourcemapFlag = process.argv.filter((a) => a.includes("--sourcemap"));
  
  files.forEach((file) => {
    const name = parse(file).name;
    const result = sass.compile(file, {
      loadPaths: ["node_modules"],
      style: minifyFlag ? "compressed" : "expanded",
      sourceMap: !!sourcemapFlag,
      sourceMapIncludeSources: !!sourcemapFlag,
    });
  
    let css = "";
  
    if (result.sourceMap) {
      const sourceMap = JSON.stringify(result.sourceMap);
      const sourceMapBase64 = (Buffer.from(sourceMap, "utf8") || "").toString(
        "base64"
      );
      const sourceMapComment = \`/*# sourceMappingURL=data:application/json;charset=utf-8;base64,\${sourceMapBase64} */\`;
      css = \`\${result.css} \${"\\n".repeat(2)} \${sourceMapComment}\`;
    } else {
      css = \`\${result.css}\`;
    }
  
    if (!existsSync(outputDir)) {
      mkdir(outputDir, (err) => {
        if (err) {
          return console.error(err);
        }
        console.log(green("CSS Directory created successfully!"));
      });
    }
    writeFile(\`\${outputDir}/\${name}.css\`, css, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(green(\`\${name}.css processed succesffuly!\`));
      }
    });
  });
  
  `;

  return {
    name: "sass.config.ts",
    content: fileContent,
  };
};

export default generateSassConfigFile;
