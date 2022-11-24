import { Component, OnInit } from '@angular/core';
import { dataMock } from './data';

type DataSet = {
  id: number;
  item_id: number;
  item_name: string;
  cost_price: number;
  sold_date: string;
  price: number;
  vat: number;
  total_price: number;
  seller_name: string;
  seller_type: string;
  buyer_name: string;
  buyer_type: string;
  purchased_date: string;
  pickup_date?: any;
  created_at: string;
};

type Accumulator = {
  date: string;
  totalSum: number;
  vat: number;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  data: any;
  data2: any;
  data3: any;
  options: any;
  acc: Accumulator[] = [];
  acc2: any[] = [];
  acc3: any[] = [
    {totalSum: 0, item_name: ""},
    {totalSum: 0, item_name: ""},
    {totalSum: 0, item_name: ""},
    {totalSum: 0, item_name: ""},
    {totalSum: 0, item_name: ""},
    {totalSum: 0, item_name: ""},
  ];
  labels: string[] = [];
  gradient: any;

  colors = {
    purple: {
      default: 'rgba(149, 76, 233, 1)',
      half: 'rgba(149, 76, 233, 0.5)',
      quarter: 'rgba(149, 76, 233, 0.25)',
      zero: 'rgba(149, 76, 233, 0)',
    },
    purple2: {
      default: 'RGB(142, 219, 218)',
      half: 'RGB(142, 219, 218)',
      quarter: 'RGB(142, 219, 218)',
      zero: 'RGB(142, 219, 218)',
    },
    indigo: {
      default: 'rgba(80, 102, 120, 1)',
      quarter: 'rgba(80, 102, 120, 0.25)',
    },
  };

  ngOnInit(): void {
    const ctx = document.getElementsByTagName('canvas')[0].getContext('2d');

    const gradient = ctx?.createLinearGradient(0, 25, 0, 300);

    gradient?.addColorStop(0, this.colors.purple.half);
    gradient?.addColorStop(0.35, this.colors.purple.quarter);
    gradient?.addColorStop(1, this.colors.purple.zero);
    this.gradient = gradient;
  }
  dataFromAPI: DataSet[];

  constructor() {
    this.dataFromAPI = dataMock;
    let accumulatedPrice: number = 0;
    let accumulatedPriceForBuyer: number = 0;
    let accumulatedDate: string = '';
    let accumulatedVat: number = 0;
    let accumulatedBuyer: string = '';
    let accumulatedItemName: string = '';
    let accumulatedItemPrice2: number = 0;

    let firstHashmap = new Map()
    let secondHashmap = new Map([
      [1, "first"],
      [2, "second"],
      [5, "fifth"]
    ]
    )



    for (let index = 0; index < this.dataFromAPI.length; index++) {
      const prevEl: DataSet | undefined = this.dataFromAPI[index - 1];
      const curEl: DataSet = this.dataFromAPI[index];
      if (prevEl) {
        const curDate = new Date(Date.parse(curEl.created_at));
        const curMonth = curDate.toLocaleString('default', { month: 'long' });
        const curDay = curDate.getDay();
        const fullCurDate = curMonth + ' ' + curDay;

        const prevDate = new Date(Date.parse(prevEl.created_at));
        const prevMonth = prevDate.toLocaleString('default', { month: 'long' });
        const prevDay = prevDate.getDay();
        const fullPrevDate = prevMonth + ' ' + prevDay;

        if (fullCurDate === fullPrevDate) {
          accumulatedPrice += prevEl.total_price + curEl.total_price;
          accumulatedVat += prevEl.vat + curEl.vat;
          accumulatedDate = fullPrevDate;
        } else {
          this.acc.push({
            totalSum: accumulatedPrice,
            date: accumulatedDate,
            vat: accumulatedVat,
          });

          accumulatedDate = '';
          accumulatedPrice = 0;
          accumulatedVat = 0;
        }
      }
    }

    for (let index = 0; index < this.dataFromAPI.length; index++) {
      const prevEl: DataSet | undefined = this.dataFromAPI[index - 1];
      const curEl: DataSet = this.dataFromAPI[index];
      if (prevEl) {
        if (prevEl.buyer_name === curEl.buyer_name) {
          for (let j = 0; j < this.dataFromAPI.length; j++) {
            accumulatedPriceForBuyer += prevEl.total_price + curEl.total_price;
            accumulatedBuyer = prevEl.buyer_name;
          }
        } else {
          this.acc2.push({
            totalSum: accumulatedPriceForBuyer,
            buyer_name: accumulatedBuyer,
          });
          accumulatedPriceForBuyer = 0;
          accumulatedBuyer = '';
        }
      }
    }
    // let nums:any = [2,7,11,15] 
    // let target: any = 9
    let tempIndex = 0;
    // var twoSum = function(nums: any, target: any) {
    //   const comp :object[]  = {};
    //   for(let i=0; i<nums.length; i++){
    //       if(comp(nums[i])] >=0 ){
    //           return [ comp[nums[i] ] , i]
    //       }
    //       comp[target-nums[i]] = i
    //   }
    // }
  

    for (let i = 0; i < this.dataFromAPI.length; i++) {
        for (let j = 0; j < this.dataFromAPI.length; j++) {

          if (this.dataFromAPI[i].item_name === this.dataFromAPI[j].item_name) {
            if (this.acc3[tempIndex]) {
              this.acc3[tempIndex].totalSum += 1; 
              this.acc3[tempIndex].item_name = this.dataFromAPI[i].item_name;
            }
          }
        } 
        tempIndex++
      }


    this.data = {
      datasets: [
        {
          data: this.acc?.map((el) => el.totalSum),
          label: 'Total Price',
          fill: true,
          backgroundColor: this.gradient,
          pointBackgroundColor: this.colors.purple.default,
          borderColor: this.colors.purple.default,
          lineTension: 0.2,
          borderWidth: 2,
          pointRadius: 3,
        },
        {
          data: this.acc.map((el) => el.vat),
          label: 'Vat',
          fill: true,
          backgroundColor: this.gradient,
          pointBackgroundColor: this.colors.purple2,
          borderColor: this.colors.purple2.default,
          lineTension: 0.2,
          borderWidth: 2,
          pointRadius: 3,
        },
      ],
      labels: this.acc.map((el) => el.date),
    };

    this.data2 = {
      datasets: [
        {
          data: this.acc2?.map((el) => el.totalSum),
          label: 'Spent',
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
      labels: this.acc2.map((el) => el.buyer_name),
    };

    this.data3 = {
      datasets: [
        {
          data: this.acc3?.map((el) => el.totalSum),
          label: 'Sold times',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        },
      ],
      labels: this.acc3.map((el) => el.item_name),
    };
    

    this.options = {
      parsing: {
        xAxisKey: 'date',
        yAxisKey: 'totalSum',
      },
      responsive: true,
      layout: {
        padding: 10,
      },
      legend: {
        display: false,
      },

      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            padding: 10,
            autoSkip: false,
            maxRotation: 15,
            minRotation: 15,
          },
        },
        y: {
          scaleLabel: {
            display: true,
            labelString: 'Weight in KG',
            padding: 10,
          },
          grid: {
            display: true,
            color: this.colors.indigo.quarter,
          },
          ticks: {
            beginAtZero: false,
            max: 63,
            min: 57,
            padding: 10,
          },
        },
      },
    };
  }
}
