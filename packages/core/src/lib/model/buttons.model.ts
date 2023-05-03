export class Button {
    public lang: string = 'de';
    public page: number;
    public visible: boolean = true;
    public percent: number = 0;
    public label: string;
    public tip: string = '';

    constructor(page: number, label: string) {
        this.page = page;
        this.label = label;
    }
}