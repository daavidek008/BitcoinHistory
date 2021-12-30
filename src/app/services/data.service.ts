import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(public http:HttpClient) {
    console.log('Data service connected..');
   }

   getCoins(){
    return  this.http.get('https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=10').map((data: any) => data['Data']);
   }
}
