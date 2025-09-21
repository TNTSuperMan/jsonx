export type Serialized =
    string | number | boolean | null
    | [8] | [9] | [10] // NaN, Infinity, -Infinity
    | [] // undefined
    | [string] // bigint
    | [0, number, string | boolean | number] // Wrapper
    | [1, number, string, string] // RegExp
    | [2, number, string, string?] // Blob
    | [3, number, string, string, (string|null)?, number?] // File(hex,name,type,last)
    | [4, number, number, string] // ArrayBuffer/TypedArray/DataView(type,hex)
    | [5, number, ...Serialized[]] // Array
    | [{ [key: string]: Serialized }, number] // Object
    | [6, number, [Serialized, Serialized][]] // Map
    | [7, number, ...Serialized[]] // Set
    | [null, number] // Reference(11<n)
