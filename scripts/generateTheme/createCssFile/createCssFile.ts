interface CssFile {
  name: string;
  content: string;
}

const createCssFile = (name: string): CssFile => {
  const content = `
    /*
    Theme Name: ${name}
    Author: Your Name
    Description: My first WordPress theme
    Version: 1.0
    */
  `;

  return {
    name: `style.css`,
    content,
  };
};

export default createCssFile;
