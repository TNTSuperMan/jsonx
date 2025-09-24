import { describe, test, expect } from "bun:test";
import { parse, stringify } from "../src";

describe("date", () => {
    test("stringify date", () =>
        expect(stringify(new Date(1758691311178))).toBe(`[1,12,1758691311178]`));
    test("parse date", () =>
        expect(parse(`[1,12,2147483647000]`)).toEqual(new Date(2147483647000)));
});
