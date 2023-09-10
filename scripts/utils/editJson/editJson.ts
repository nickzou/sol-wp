import fs from "fs";
import path from "path";

type Object = {
  key: string;
  value: string;
};

type Edits = {
  key: string;
  value: Object[] | string[];
};

interface editJson {
  filePath: string;
  fileName: string;
  edits: Object | Edits;
}

const editJson = ({ filePath, fileName, edits }: editJson) => {
  try {
    const resolvedPath = path.resolve(filePath, fileName);

    const fileContent = fs.readFileSync(resolvedPath, "utf-8");

    const jsonContent = JSON.parse(fileContent);

    if (!Array.isArray(edits.value)) {
      jsonContent[edits.key] = edits.value;
    } else {

      let newArray;
      if (typeof edits.value[0] === 'object') {
        newArray = edits.value.map((e) => ({ [e.key]: e.value }));
      } else if (typeof edits.value[0] === 'string') {
        newArray = edits.value.reduce((acc, item) => {
          if (!acc.includes(item)) {
            acc.push(item);
          }
          return acc;
        }, []);
      }

      if (
        Array.isArray(jsonContent[edits.key]) &&
        jsonContent[edits.key].length > 0
      ) {
        jsonContent[edits.key] = [...new Set([...jsonContent[edits.key], ...newArray])];
      } else {
        jsonContent[edits.key] = newArray;
      }
    }

    const updatedContent = JSON.stringify(jsonContent);

    return updatedContent;
  } catch (error) {
    throw new Error(`An error occurred while reading the file. ${error}`);
  }
};

export default editJson;
