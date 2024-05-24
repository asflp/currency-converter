import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ValutType} from "./data/valutType";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DataHandlerService} from "./services/data-handler.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, NgForOf, FormsModule, HttpClientModule],
  providers: [DataHandlerService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent{
  constructor(private dataHandlerService: DataHandlerService) {}

  title = 'Конвертер валют';
  data: Map<string, ValutType> = new Map([
    ["USD", {img: "../assets/usa.png", sign: "$", value: 1, course: 1}],
    ["EUR", {img: "../assets/euro.png", sign: "€", value: 1, course: 1}],
    ["GBP", {img: "../assets/england.png", sign: "£", value: 1, course: 1}],
    ["CNY", {img: "../assets/china.png", sign: "¥", value: 1, course: 1}],
    ["TRY", {img: "../assets/turkey.png", sign: "₺", value: 1, course: 1}],
  ])

  inputValue: number = 1;
  onInputChange(newValue: number) {
    this.inputValue = newValue;
    this.data.forEach((value) => {
      value.value = newValue * value.course
    });
  }

  ngOnInit() {
    this.dataHandlerService.getCurrencyRates().subscribe(result => {
      for (let key in result) {
        if (this.data.has(key)) {
          const item = this.data.get(key)!;
          item.course = 1 / result[key].Value;
          item.value = item.course;
          this.data.set(key, item!);
        }
      }
    });
  }
}
