import { describe, test, expect } from "bun:test";
import { parse, stringify } from "../src";

describe("set", () => {
    test("stringify set", () =>
        expect(stringify(new Set<unknown>([
            "Bun",
            "Node.js",
            "Deno"
        ]))).toBe(`[8,12,"Bun","Node.js","Deno"]`));
    test("parse set", () =>
        expect(parse(`[8,12,"Windows","macOS","Linux"]`)).toEqual(new Set([
            "Windows",
            "macOS",
            "Linux"
        ])));
});
