export class ConfigString {
    public id: string;
    public value: number | string | boolean;

    constructor(id: string, value: number | string | boolean) {
        this.id = id;
        this.value = value;
    }
}