import { ConfigStringValue } from "../type/configStringValue.type";

export class ConfigString {
    public id: string;
    public value: ConfigStringValue;

    constructor(id: string, value: ConfigStringValue) {
        this.id = id;
        this.value = value;
    }
    
    toString(): string {
        return JSON.stringify(this);
    }
}