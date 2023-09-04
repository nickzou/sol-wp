#!/usr/bin/env node

import { greenBright, green } from "colorette";
import ora from "ora";
import executeCommand from "../utils/executeCommand/executeCommand";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

const title = greenBright(`
Welcome to

 $$$$$$\\   $$$$$$\\  $$\\             $$\\      $$\\ $$$$$$$\\  
$$  __$$\\ $$  __$$\\ $$ |            $$ | $\\  $$ |$$  __$$\\ 
$$ /  \\__|$$ /  $$ |$$ |            $$ |$$$\\ $$ |$$ |  $$ |
\\$$$$$$\\  $$ |  $$ |$$ |            $$ $$ $$\\$$ |$$$$$$$  |
 \\____$$\\ $$ |  $$ |$$ |            $$$$  _$$$$ |$$  ____/ 
$$\\   $$ |$$ |  $$ |$$ |            $$$  / \\$$$ |$$ |      
\\$$$$$$  | $$$$$$  |$$$$$$$$\\       $$  /   \\$$ |$$ |      
 \\______/  \\______/ \\________|      \\__/     \\__|\\__|
`);

const init = async () => {
  console.log(title);

  sleep(500);

  setTimeout(() => {
    const spinner = ora({
      text: "Setting up...",
      spinner: "dots",
    }).start();

    setTimeout(() => {
      executeCommand("mkdir -p wp/themes", true);
      spinner.stop();
      console.clear();
      console.log(green("Setup complete."));
    }, 1000);
  }, 0);
};

(async () => await init())();
