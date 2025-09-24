import { describe, test, expect } from "bun:test";
import { parse, stringify } from "../src";

describe("map", () => {
    test("stringify map", () =>
        expect(stringify(new Map<unknown, unknown>([
            ["name", "TNTSuperMan"],
            ["admin", true]
        ]))).toBe(`[7,12,[["name","TNTSuperMan"],["admin",true]]]`));
    test("parse map", () =>
        expect(parse(`[7,12,[["os","wsl"],["tool","bun"]]]`)).toEqual(new Map([
            ["os", "wsl"],
            ["tool", "bun"]
        ])));
});
