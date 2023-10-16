import { File } from "../../utils/types/File";

const generateFunctionsFile = (): File => {
  const content = `<?php
  //Functions go here;
  require_once get_template_directory() . '/vendor/autoload.php';
?>`;

  return {
    name: "functions.php",
    content,
  };
};

export default generateFunctionsFile;
