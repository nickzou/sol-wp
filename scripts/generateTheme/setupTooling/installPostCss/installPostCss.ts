import { exec } from "child_process";

exec("npm install postcss --save-dev", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing command: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`Standard Error: ${stderr}`);
    return;
  }

  console.log(`Standard Output: \n${stdout}`);
});
