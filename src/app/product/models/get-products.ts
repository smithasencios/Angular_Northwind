export class GetProducts {
    Limit: number;
    Offset: number;
    constructor(limit: number, offset: number) {
        this.Limit = limit;
        this.Offset = offset;
    }
}