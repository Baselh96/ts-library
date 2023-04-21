export class MathClass {

    constructor() {}

    public sum(x: number, y: number): number {
        return x + y
    }

    public multi(x: number, y: number, z: number): number {
        return x * y * z;
    }

    public around(x: number): number {
        return Math.round(x);
    }

    public max(x: number, y: number): number {
        return Math.max(x, y);
    }
}