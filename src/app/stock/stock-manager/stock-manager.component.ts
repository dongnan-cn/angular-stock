import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Stock, StockService } from '../stock.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stock-manager',
  templateUrl: './stock-manager.component.html',
  styleUrls: ['./stock-manager.component.css']
})
export class StockManagerComponent implements OnInit, OnChanges {
  private stocks: Observable<Stock[]>;

  private nameFilter: FormControl = new FormControl()

  private keyword: string
  constructor(public router: Router, private stockService: StockService) { }

  ngOnInit() {
    console.log("initialized again")
    console.log(this.stocks)

    this.stocks = this.stockService.getStocks();


    this.nameFilter.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => this.keyword = value)
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("changed")
  }

  create() {
    this.router.navigateByUrl('/stock/0')
  }
  update(stock: Stock) {
    this.router.navigateByUrl('/stock/' + stock.id)
  }
}
