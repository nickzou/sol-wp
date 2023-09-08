import formatMessage from "../formatMessage";
import { green, yellow, red, gray } from "colorette";

describe("formatMessage", () => {
  it("formats message in green when color is green", () => {
    const result = formatMessage({ message: "Hello, World!", color: "green" });
    expect(result).toBe(`${gray(`│`)}  ${green(`Hello, World!`)}`);
  });

  it("formats message in yellow when color is yellow", () => {
    const result = formatMessage({ message: "Warning!", color: "yellow" });
    expect(result).toBe(`${gray(`│`)}  ${yellow(`Warning!`)}`);
  });

  it("formats message in red when color is red", () => {
    const result = formatMessage({
      message: "An error occurred.",
      color: "red",
    });
    expect(result).toBe(`${gray(`│`)}  ${red(`An error occurred.`)}`);
  });

  it("formats message in gray when an invalid color is provided", () => {
    // Here I'm casting "invalidColor" to any to bypass TypeScript's type checking,
    // since we're specifically testing how the function behaves with invalid input.
    const result = formatMessage({
      message: "Invalid color",
      color: "invalidColor" as any,
    });
    expect(result).toBe(`${gray(`│`)}  Invalid color`);
  });
});
