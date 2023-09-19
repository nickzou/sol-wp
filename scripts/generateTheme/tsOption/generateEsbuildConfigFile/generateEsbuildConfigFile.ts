import { File } from "@utils/types/File";
interface generateEsbuildConfigFile {
  themeFolder: string;
}
const generateEsbuildConfigFile = ({
  themeFolder,
}: generateEsbuildConfigFile): File => {
  const content = `import * as esbuild from 'esbuild';
import 'dotenv/config';
import { resolve } from 'path';
import glob from 'glob';
import browserslist from 'browserslist';
import { esbuildPluginBrowserslist } from 'esbuild-plugin-browserslist';
import { green, red } from 'colorette';
import { type Format } from 'esbuild';
  
const filesFlag = process.argv.filter(a => a.includes("--files"));
const minifyFlag = process.argv.filter(a => a.includes("--minify"));
const sourcemapFlag = process.argv.filter(a => a.includes("--sourcemap"));
const formatFlag = process.argv.filter(a => a.includes("--format"));
  
const fileDir = filesFlag.length >= 1 ? filesFlag[0]!.split("=")[1] as string : "./src/ts/*.{ts,tsx}";
  
const minify = minifyFlag.length >= 1 || (minifyFlag.length >= 1 && minifyFlag[0]!.split("=")[1] === "true") ? true : false;
const sourcemap = sourcemapFlag.length >= 1 || (sourcemapFlag.length >= 1 && sourcemapFlag[0]!.split("=")[1]) === "true" ? true : false; 
  
const format = formatFlag.length >=1 ? formatFlag[0]!.split("=")[1] as Format : 'cjs';
  
const files = glob.sync(fileDir);
  
esbuild.build({
  entryPoints: files,
  outdir: resolve(__dirname, \`wp/themes/${themeFolder}/js\`),
  bundle: true,
  minify: minify,
  sourcemap: sourcemap,
  format: format,
  plugins: [
    esbuildPluginBrowserslist(browserslist('defaults'), {
      printUnknownTargets: true
    })
  ]
})
.then(result => {
  console.log(green('JavaScript bundled successfully!'));
  console.log(result);
})
.catch(error => {
  console.log(red('JavaScript bundle failed.'));
  console.log(error);
  process.exit(1);
});`;
  return {
    name: "esbuild.config.ts",
    content,
  };
};

export default generateEsbuildConfigFile;
