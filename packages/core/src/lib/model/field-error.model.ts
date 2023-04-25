export class FieldError {
    public name: string;
    public title: string;

    constructor(name: string, title: string) {
        this.name = name;
        this.title = title;
    }
}