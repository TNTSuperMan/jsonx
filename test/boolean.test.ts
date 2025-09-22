import { describe, test, expect } from "bun:test";
import { parse, stringify } from "../src";

describe("boolean", () => {
    test("stringify true", () =>
        expect(stringify(true)).toBe(`true`));
    test("parse true", () =>
        expect(parse(`true`)).toBe(true));

    test("stringify false", () =>
        expect(stringify(false)).toBe(`false`));
    test("parse false", () =>
        expect(parse(`false`)).toBe(false));
});
