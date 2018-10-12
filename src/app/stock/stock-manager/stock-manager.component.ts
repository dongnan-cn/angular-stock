import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-manager',
  templateUrl: './stock-manager.component.html',
  styleUrls: ['./stock-manager.component.css']
})
export class StockManagerComponent implements OnInit {
  private stocks: Array<Stock>;

  constructor(public router: Router) { }

  ngOnInit() {
    this.stocks = [
      new Stock(1, "600001", 1.99, 3.5, " First stock", ["IT", "互联网"]),
      new Stock(2, "600002", 2.99, 2.5, " First stock", ["IT", "互联网"]),
      new Stock(3, "600003", 3.99, 3.5, " First stock", ["IT", "互联网"]),
      new Stock(4, "600004", 4.99, 4.5, " First stock", ["IT", "互联网"]),
      new Stock(5, "600005", 5.99, 3.5, " First stock", ["IT", "互联网"]),
      new Stock(6, "600006", 6.99, 1.0, " First stock", ["IT", "互联网"]),
      new Stock(7, "600007", 7.99, 3.5, " First stock", ["IT", "互联网"])
    ];
  }
  create() {
    this.router.navigateByUrl('/stock/0')
  }
  update(stock: Stock) {
    this.router.navigateByUrl('/stock/' + stock.id)
  }
}

export class Stock {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public rating: number,
    public desc: string,
    public categories: Array<string>
  ) {

  }
}