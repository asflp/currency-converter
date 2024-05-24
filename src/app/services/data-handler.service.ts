import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

interface Currency {
  Value: number
}

interface CurrencyResponse {
  [key: string]: Currency[];
}

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  private apiUrl = 'https://www.cbr-xml-daily.ru/daily_json.js';

  constructor(private httpClient: HttpClient) { }

  getCurrencyRates(): Observable<Currency[]> {
    return this.httpClient.get<CurrencyResponse>('https://www.cbr-xml-daily.ru/daily_json.js').pipe(
      map(response => response["Valute"])
    );
  }
}
