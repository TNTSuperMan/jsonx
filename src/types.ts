export type Serialized =
    string | number | boolean | null
    | [9] | [10] | [11] // NaN, Infinity, -Infinity
    | [] // undefined
    | [string] // bigint
    | [0, number, string | boolean | number] // Wrapper
    | [1, number, number] // Date
    | [2, number, string, string] // RegExp
    | [3, number, string, string?] // Blob
    | [4, number, string, string, (string|null)?, number?] // File(hex,name,type,last)
    | [5, number, number, string] // ArrayBuffer/TypedArray/DataView(type,hex)
    | [6, number, ...Serialized[]] // Array
    | [{ [key: string]: Serialized }, number] // Object
    | [7, number, [Serialized, Serialized][]] // Map
    | [8, number, ...Serialized[]] // Set
    | [null, number] // Reference(11<n)
