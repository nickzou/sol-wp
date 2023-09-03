interface createCssFile {
  name: string;
  author: string;
  description: string;
  version: string;
}

interface CssFile {
  name: string;
  content: string;
}

const createCssFile = ({
  name,
  author,
  description,
  version,
}: createCssFile): CssFile => {
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

export default createCssFile;
