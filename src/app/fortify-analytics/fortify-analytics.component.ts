import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fortify-analytics',
  templateUrl: './fortify-analytics.component.html',
  styleUrls: ['./fortify-analytics.component.scss'],
})
export class FortifyAnalyticsComponent implements OnInit {
  basicData: any;
  basicOptions: any;
  constructor() {}

  ngOnInit() {
    this.basicData = {
      labels: [
        'Aug 24',
        'Dec 28',
        'Aug 15',
        'Aug 21',
        'Aug 28',
        'Sep 4,',
        'Sep 10',
        'Sep 17',
        'Sep 24',
        'Oct 2,',
        'Oct 10',
        'Oct 17',
        'Oct 24',
        'Oct 31',
        'Nov 14',
        'Oct 29',
        'Nov 6',
      ],
      datasets: [
        {
          label: 'SResposibility',
          data: [95, 70, 50, 60, 28, 50, 40, 58, 40, 28, 30, 45, 43, 40, 43, 45, 88],
          fill: false,
          borderColor: '#1cd40b',
          // tension: 0,
        },
        {
          label: 'Overall',
          data: [56, 37, 54, 57, 58, 53, 52, 62, 54, 55, 43, 52, 46, 40, 49, 64, 73],
          fill: false,
          borderColor: '#0b9bd4',
          // tension: 0,
        },
      ],
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#083766',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#083766',
          },
          grid: {
            color: 'rgba(255,255,255,0.2)',
          },
        },
        y: {
          ticks: {
            color: '#083766',
          },
          grid: {
            color: 'rgba(255,255,255,0.2)',
          },
        },
      },
    };
  }
}
