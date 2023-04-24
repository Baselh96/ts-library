"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayClass = void 0;
class ArrayClass {
    constructor() { }
    multi(array, x) {
        return array.map(item => item * x);
    }
}
exports.ArrayClass = ArrayClass;
