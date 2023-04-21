"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathClass = void 0;
class MathClass {
    sum(x, y) {
        return x + y;
    }
    multi(x, y, z) {
        return x * y * z;
    }
    around(x) {
        return Math.round(x);
    }
    max(x, y) {
        return Math.max(x, y);
    }
}
exports.MathClass = MathClass;
