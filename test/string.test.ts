import { describe, test, expect } from "bun:test";
import { parse, stringify } from "../src";

describe("string", () => {
    test("stringify string", () => 
        expect(stringify("Hello!!")).toBe(`"Hello!!"`));
    test("parse string", () =>
        expect(parse(`"Hello!!"`)).toBe("Hello!!"));
});
