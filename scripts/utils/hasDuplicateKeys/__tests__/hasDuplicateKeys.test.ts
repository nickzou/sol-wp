// hasDuplicateKeys.test.ts
import hasDuplicateKeys from "@utils/hasDuplicateKeys/hasDuplicateKeys";

describe("hasDuplicateKeys", () => {
  it("should return true when there are duplicate keys", () => {
    const arr = [{ key: 12 }, { key2: 13 }, { key: 5 }];

    expect(hasDuplicateKeys(arr)).toBe(true);
  });

  it("should return false when there are no duplicate keys", () => {
    const arr = [{ key1: 12 }, { key2: 13 }, { key3: 5 }];

    expect(hasDuplicateKeys(arr)).toBe(false);
  });

  it("should return false for an empty array", () => {
    const arr: any[] = [];

    expect(hasDuplicateKeys(arr)).toBe(false);
  });

  it("should return false for an array with a single object", () => {
    const arr = [{ key: 12 }];

    expect(hasDuplicateKeys(arr)).toBe(false);
  });
});
