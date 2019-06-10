export class ProductBestSeller {

    constructor(public id: number,
        public name: string,
        public vendidos: number,
        public y: number) { }

    static EmptyInstance() {
        return new ProductBestSeller(null, null, null, null);
    }
    static mapFromResponse(data: any, totalVendidos: any) {
        return new ProductBestSeller(data.id, data.product_name, data.vendidos, this.getPorcentaje(totalVendidos, data.vendidos))
    }
    static getPorcentaje(totalVendidos: any, vendidos: any) {
        return (vendidos / totalVendidos) * 100;
    }
}
