export class File {
    public fid: string;
    public fname: string;
    public fsize: number;

    constructor(fid: string, fname: string, fsize: number) {
        this.fid = fid;
        this.fname = fname;
        this.fsize = fsize;
    }
}