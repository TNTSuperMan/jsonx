import { stringify, parse } from "./src";

const ritual = {
    name: "boundary-collapse",
    timestamp: new Date(),
    config: new Map([
        ["mode", "reflective"],
        ["depth", 5n]
    ]),
    tags: new Set(["oss", "ritual", "artifact"]),
    pattern: /collapse/i,
};

ritual.self = ritual;
ritual.meta = {
    parent: ritual,
    children: [ritual],
    cloneHint: "structured"
};

const str = stringify(ritual);

console.log(str);

const parsed = parse(str);

console.log(parsed);

console.log(Bun.deepEquals(ritual, parsed));
