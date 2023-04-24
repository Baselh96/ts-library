export class ArrayClass {

    constructor() {}

    public multi(array: number[], x: number): number[] {
        return array.map(item => item * x);
    }
}