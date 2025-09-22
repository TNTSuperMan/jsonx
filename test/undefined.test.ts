import { describe, test, expect } from "bun:test";
import { parse, stringify } from "../src";

describe("undefined", () => {
    test("stringify undefined", () =>
        expect(stringify(undefined)).toBe(`[]`));
    test("parse undefined", () =>
        expect(parse(`[]`)).toBe(undefined));
});
