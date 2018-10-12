import { Component, OnInit } from '@angular/core';
import { Stock } from '../stock.service';


@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {
  stock: Stock
  constructor() { }

  ngOnInit() {
    this.stock = new Stock(2, "600002", 2.99, 2.5, " First stock", ["IT", "互联网"])
  }

}
