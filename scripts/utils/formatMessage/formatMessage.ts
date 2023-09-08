import { green, yellow, red, gray } from "colorette";

interface formatMessage {
  message: string;
  color?: "green" | "yellow" | "red";
}
const formatMessage = ({ message, color }: formatMessage) => {
  let colorFunction;

  switch (color) {
    case "green":
      colorFunction = green;
      break;
    case "yellow":
      colorFunction = yellow;
      break;
    case "red":
      colorFunction = red;
      break;
    default:
      colorFunction = null;
      break;
  }

  if (!colorFunction) {
    return `${gray(`│`)}  ${message}`;
  }

  return `${gray(`│`)}  ${colorFunction(message)}`;
};

export default formatMessage;
