import { describe, test, expect } from "bun:test";
import { parse, stringify } from "../src";

describe("object", () => {
    test("stringify object", () =>
        expect(stringify({
            name: "TNTSuperMan",
            admin: true
        })).toBe(`[{"name":"TNTSuperMan","admin":true},12]`));
    test("parse object", () =>
        expect(parse(`[{"os":"wsl","tool":"bun"},12]`)).toEqual({
            os: "wsl",
            tool: "bun"
        }));
});
