import { Component, ElementRef } from '@angular/core';
import { DataService } from './services/data.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  chart = [];
  coinsData: Coin[];

  constructor(private dataService: DataService, private elementRef: ElementRef) { }

  ngOnInit() {
    this.dataService.getCoins().subscribe((coinsData) => {
      this.coinsData = coinsData;

      let open = coinsData.map(res => res.open);
      let close = coinsData.map(res => res.close);
      let datum = coinsData.map(res => res.time);

      let coinDates = [];
      datum.forEach((res) => {
        let jsdate = new Date(res * 1000)
        coinDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
      })

      var ctx = document.getElementById("canvas");

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: coinDates,
          datasets: [
            {
              data: open,
              label: 'Open',
              borderColor: 'blue',
              fill: false
            },
            {
              data: close,
              label: 'Close',
              borderColor: 'red',
              fill: false
            },
          ]
        },
        options: {
          legend: {
            display: true,
            labels: {
              fontColor: 'rgb(255, 99, 132)'
            }
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }]
          }
        }
      })
    })
  }
}


interface Coin {
  time: number,
  close: number,
  high: number,
  low: number,
  open: number,
  volumefrom: number,
  volumeto: number
}
