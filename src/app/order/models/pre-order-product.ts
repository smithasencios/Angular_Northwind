export class PreOrderProduct{
    Product_Id: number;
    Description: string;
    Quantity: number;
    Unit_Price: number;
    Total_Value: number;

    constructor(product_id: number,
        description: string,
        unit_price: number) {
        this.Product_Id = product_id;
        this.Description = description;
        this.Quantity = 1;
        this.Unit_Price = Number(unit_price.toFixed(2));
        this.Total_Value = Number((this.Quantity * unit_price).toFixed(2));
    }

}
