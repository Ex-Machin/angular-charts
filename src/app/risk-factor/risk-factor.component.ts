import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { UIChart } from 'primeng/chart';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-risk-factor',
  templateUrl: './risk-factor.component.html',
  styleUrls: ['./risk-factor.component.scss'],
})
export class RiskFactorComponent implements OnInit {
  data: any;


  changingValue: Subject<boolean> = new Subject();
  @ViewChild('appChild', { static: true }) appChild!: UIChart;

  number = 0;

  pChartTypes: string[] = [
    'line', 'bar', 'radar', 'pie'
  ]



  doSomething() {
    
    console.log('this.appChild :>> ', this.appChild);
    this.appChild.type = this.pChartTypes[this.number]
    this.number++
    this.appChild.reinit()
    this.appChild.refresh()
  }

  chartOptions: any;

  update(event: Event) {
    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#116903',
          },
        },
      },
      scales: {
        r: {
          pointLabels: {
            color: '#116903',
          },
          grid: {
            color: '#116903',
          },
          angleLines: {
            color: '#116903',
          },
        },
      },
    };
  }

  selectedData: String;

  canvas: any;

  selectData(event: any) {
    const index = event.element.index;
    this.selectedData = this.labels[index];
    //event.dataset = Selected dataset
    //event.element = Selected element
    //event.element._datasetIndex = Index of the dataset in data
    //event.element._index = Index of the data in dataset
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.selectedData = '';
  }

  labels: String[] = [
    'Mindfulness & Spirituality',
    'Mental Enrichment',
    'Meaning & Purpose',
    'Relationship Quality',
    'Environment',
    'Nutrition',
    'Sleep',
    'Exercise',
    'Peace',
    'Happiness',
    'Trauma',
    'Financial Management',
    'Time Management',
    'Stress Management',
  ];

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.canvas =
    //   this.elementRef.nativeElement.querySelector('canvas');
    //   console.log('element :>> ', this.canvas.);
    // this.canvas.refresh()
    // }, 1000)
    this.data = {
      labels: this.labels,
      datasets: [
        {
          data: [85, 80, 31, 81, 93, 52, 89, 41, 91, 78, 90, 41, 90, 60],
          // backgroundColor: [
          //   '#42A5F5',
          //   '#66BB6A',
          //   '#FFA726',
          //   '#26C6DA',
          //   '#fcba03',
          //   '#03fc56',
          //   '#e8072c',
          //   '#fc03d7',
          //   '#0768e8',
          //   '#07e8e4',
          //   '#965114',
          //   '#1e0369',
          //   '#5d0369',
          //   '#116903',
          // ],
          label: 'My First dataset',
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
        },
      ],
    };

    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
      },
      scales: {
        r: {
          grid: {
            color: '#ebedef',
          },
        },
      },
    };
  }
}
