import { spawn } from "child_process";
import { red } from "colorette";

const executeCommand = async (command, args) => {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
    });

    child.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(red(`Command failed with exit code ${code}`)));
      } else {
        resolve();
      }
    });
  });
};

export default executeCommand;
