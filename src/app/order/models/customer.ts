export class Customer {
    constructor(public id: number,
        public name: string,
        public address: string,
        public business_phone: string,
        public city: string,
        public company: string) {

    }
    static EmptyInstance() {
        return new Customer(null, null, null, null, null, null);
    }
    static mapFromResponse(data: any) {
        return new Customer(data.id, `${data.first_name},${data.last_name}`, data.address, data.business_phone, data.city, data.company);
    }
}