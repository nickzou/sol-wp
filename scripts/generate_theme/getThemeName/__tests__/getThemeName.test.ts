import getThemeName from "../getThemeName";
import { input } from "@inquirer/prompts";

// Mocking input from @inquirer/prompts
jest.mock("@inquirer/prompts", () => ({
  input: jest.fn(),
}));

describe("getThemeName", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("returns the default theme name if user doesn't enter one", async () => {
    // Set up mock return value for input
    (input as jest.Mock).mockResolvedValueOnce(undefined);

    // Call the function
    const themeName = await getThemeName();

    // Assertions
    expect(input).toHaveBeenCalledTimes(1);
    expect(input).toHaveBeenCalledWith({
      message: "Provide a name for your theme",
      default: "Sol WP",
    });
    expect(themeName).toBe("Sol WP");
  });
  it("returns the theme name based on user input", async () => {
    // Set up mock return value for input
    (input as jest.Mock).mockResolvedValueOnce("My Custom Theme");

    // Call the function
    const themeName = await getThemeName();

    // Assertions
    expect(input).toHaveBeenCalledTimes(1);
    expect(input).toHaveBeenCalledWith({
      message: "Provide a name for your theme",
      default: "Sol WP",
    });
    expect(themeName).toBe("My Custom Theme");
  });
});
