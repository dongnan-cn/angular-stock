import { Component, OnInit } from '@angular/core';
import { Stock, StockService } from '../stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';


@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {
  stock: Stock = new Stock(0, "", 0, 0, "", [])
  formModel: FormGroup

  categories = ["IT", "互联网", "金融"]


  constructor(private routeInfo: ActivatedRoute,
    private stockService: StockService,
    private router: Router) { }

  ngOnInit() {
    let stockId = this.routeInfo.snapshot.params['id']

    //create form builder
    let fb = new FormBuilder()
    //最开始因为值尚未取回来，所以先赋予空，等异步取回来再更新
    this.formModel = fb.group(
      {
        //对于name属性做两个校验
        name: ['', [Validators.required, Validators.minLength(3)]],
        price: ['', [Validators.required]],
        //简单绑定，可以替代插值表达式
        desc: [''],
        categories: fb.array([
          new FormControl(false),
          new FormControl(false),
          new FormControl(false)
        ], this.categorySelectValidator)
      }
    )

    this.stockService.getStock(stockId).subscribe(
      
      data => {
        this.stock = data
        this.formModel.reset(
          {
            name:data.name,
            price:data.price,
            desc:data.desc,
            categories:[
              data.categories.indexOf(this.categories[0]) != 1,
              data.categories.indexOf(this.categories[1]) != 1,
              data.categories.indexOf(this.categories[2]) != 1
            ]
          }
        )
      }
    )
  }

  categorySelectValidator(control: FormArray) {
    var isValid = false
    control.controls.forEach(c => {
      isValid = isValid || c.value
    })

    if (isValid) {
      return null
    } else {
      //出现错误，返回错误标识
      return { categoriesLength: true }
    }
  }

  cancel() {
    this.router.navigateByUrl('/stock');
  }

  save() {
    var chineseCategories = []
    var index = 0
    for (var i = 0; i < 3; i++) {
      if (this.formModel.value.categories[i]) {
        chineseCategories[index++] = this.categories[i]
      }
    }
    //console.log(this.formModel.value)
    this.formModel.value.categories = chineseCategories
    this.formModel.value.rating = this.stock.rating
    this.router.navigateByUrl('/stock');
  }
}
