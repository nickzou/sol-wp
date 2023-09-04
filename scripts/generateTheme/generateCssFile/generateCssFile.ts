interface generateCssFile {
  name: string;
  author: string;
  description: string;
  version: string;
}

interface CssFile {
  name: string;
  content: string;
}

const generateCssFile = ({
  name,
  author,
  description,
  version,
}: generateCssFile): CssFile => {
  const content = `
    /*
    Theme Name: ${name}
    Author: ${author}
    Description: ${description}
    Version: ${version}
    */
  `;

  return {
    name: `style.css`,
    content,
  };
};

export default generateCssFile;
