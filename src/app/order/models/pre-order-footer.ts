import { PreOrderProduct } from './pre-order-product';

export class PreOrderFooter {
    TotalValorVenta: number;
    ImpuestoGeneralVentas: number;
    ImporteTotal: number;

    constructor(preOrderHeaderList: PreOrderProduct[]) {
        this.TotalValorVenta = Number(preOrderHeaderList.reduce((sum, item) => sum + item.Total_Value, 0).toFixed(2));
        this.ImpuestoGeneralVentas = Number((0.18 * this.TotalValorVenta).toFixed(2));
        this.ImporteTotal = this.TotalValorVenta + this.ImpuestoGeneralVentas;
    }
    static createEmptyInstance(): PreOrderFooter {
        return new PreOrderFooter([]);
    }
}
