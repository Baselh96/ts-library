export class Button {
    public lang = 'de';
    public page: number;
    public visible = true;
    public percent = 0;
    public label: string;
    public tip = '';

    constructor(page: number, label: string) {
        this.page = page;
        this.label = label;
    }
}