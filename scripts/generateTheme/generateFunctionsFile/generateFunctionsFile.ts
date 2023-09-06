import { File } from "../../utils/types/File";

const generateFunctionsFile = (): File => {
  const content = `<?php
  //Functions go here;
?>`;

  return {
    name: "functions.php",
    content,
  };
};

export default generateFunctionsFile;
