export class GetOrders {
    Limit: number;
    Offset: number;
    Status: number;
    Date_From: string;
    Date_To: string;

    constructor(limit: number, offset: number) {
        this.Limit = limit;
        this.Offset = offset;
    }
}