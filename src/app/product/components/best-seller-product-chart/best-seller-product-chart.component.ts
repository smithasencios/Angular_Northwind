import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ProductBestSeller } from '../../models/product-best-seller';

@Component({
  selector: 'app-best-seller-product-chart',
  templateUrl: './best-seller-product-chart.component.html',
  styleUrls: ['./best-seller-product-chart.component.scss']
})
export class BestSellerProductChartComponent implements OnInit, OnChanges {


  @Input()
  products: ProductBestSeller[];
  Highcharts: any;
  chartOptions: any;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.products && changes.products.currentValue) {
      this.buildChart();
    }
  }
  ngOnInit() {
  }
  buildChart(): void {
    this.Highcharts = Highcharts;
    this.chartOptions = {
      title: {
        text: '10 Productos que generan mas ingresos'
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: 'Porcentaje del total de ingresos'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> del total<br/>'
      },
      series: [{
        name: 'Productos',
        type: 'column',
        colorByPoint: true,
        data: this.products
      }]
    };
  }

}
