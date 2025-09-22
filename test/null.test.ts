import { describe, test, expect } from "bun:test";
import { parse, stringify } from "../src";

describe("null", () => {
    test("stringify null", () =>
        expect(stringify(null)).toBe(`null`));
    test("parse null", () =>
        expect(parse(`null`)).toBe(null));
});
