import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menus: Array<MenuItem>
  currentMenuId: number
  constructor(public router: Router) { }

  ngOnInit() {
    this.menus = [
      new MenuItem(1, 'Home', 'dashboard'),
      new MenuItem(2, 'Stock Management', 'stock')
    ];
  }
  nav(menu: MenuItem) {
    this.router.navigateByUrl(menu.link)
    this.currentMenuId = menu.id
  }
}

export class MenuItem {
  constructor(
    public id: number,
    public name: string,
    public link: string
  ) {

  }
}