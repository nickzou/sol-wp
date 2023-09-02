import getDescription from "../getDescription";
import { input } from "@inquirer/prompts";

// Mocking input from @inquirer/prompts
jest.mock("@inquirer/prompts", () => ({
  input: jest.fn(),
}));

describe("getThemeName", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("returns the default description if user doesn't enter one", async () => {
    // Set up mock return value for input
    (input as jest.Mock).mockResolvedValueOnce(undefined);

    // Call the function
    const description = await getDescription();

    // Assertions
    expect(input).toHaveBeenCalledTimes(1);
    expect(description).toBe("A boilerplate theme provided by Sol WP.");
  });

  it("returns the theme description based on user input", async () => {
    // Set up mock return value for input
    (input as jest.Mock).mockResolvedValueOnce("My Custom Theme Description");

    // Call the function
    const description = await getDescription();

    // Assertions
    expect(input).toHaveBeenCalledTimes(1);
    expect(description).toBe("My Custom Theme Description");
  });

  // it("filters HTML from user input", async () => {
  //   (input as jest.Mock).mockResolvedValueOnce(
  //     "<h1>This is a <strong>description</strong>.</h1>"
  //   );

  //   const description = await getDescription();

  //   expect(input).toHaveBeenCalledTimes(1);
  //   expect(description).toBe("HTML is not allowed. Please try again.");
  // });
});
