export class PreOrderProduct {
    Id: number;
    Product_Id: number;
    Description: string;
    Quantity: number;
    Unit_Price: number;
    Total_Value: number;

    constructor(id: number,
        product_id: number,
        description: string,
        unit_price: number) {
        this.Id = id;
        this.Product_Id = product_id;
        this.Description = description;
        this.Quantity = 1;
        this.Unit_Price = Number(unit_price.toFixed(2));
        this.Total_Value = Number((this.Quantity * unit_price).toFixed(2));
    }

}
