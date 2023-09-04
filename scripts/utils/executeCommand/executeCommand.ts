import { exec } from "child_process";

const executeCommand = (command: string, hideLogs: boolean = false) => {
  exec(`${command}`, (error, stdout, stderr) => {
    if (error && !hideLogs) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }

    if (stderr && !hideLogs) {
      console.error(`Standard Error: ${stderr}`);
      return;
    }

    !hideLogs && console.log(`Standard Output: \n${stdout}`);
  });
};

export default executeCommand;
