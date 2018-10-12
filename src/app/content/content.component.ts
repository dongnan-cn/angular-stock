import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  pageTitle = ''
  pageDesc = ''
  constructor(public router: Router) {
    // This is how to filter router events 
    // with Angular 6+ and latest RxJS:
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url == '/dashboard') {
        this.pageTitle = "Here is home page"
        this.pageDesc = "Here is home page Desc"
      } else if(event.url.startsWith('/stock')){
        this.pageTitle = "股票信息管理"
        this.pageDesc = "进行基本CRUD"
      }
    });


  }

  ngOnInit() {
  }

}