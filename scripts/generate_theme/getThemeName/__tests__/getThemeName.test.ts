import inquirer from "inquirer";
import getThemeName from "../getThemeName";

jest.mock("inquirer");

describe("getThemeName", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return theme name from the user input", async () => {
    inquirer.prompt.mockResolvedValue({ theme_name: "My Custom Theme" });

    const themeName = await getThemeName();

    expect(themeName).toBe("My Custom Theme");
  });
});
