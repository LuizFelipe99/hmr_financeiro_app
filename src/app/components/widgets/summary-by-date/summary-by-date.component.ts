import {
  Component,
  Input,
  OnChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexStroke,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexLegend
} from 'ng-apexcharts';

import { HttpClient, HttpParams } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  legend: ApexLegend;
};

@Component({
  selector: 'app-summary-by-date',
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  templateUrl: './summary-by-date.component.html',
  styleUrl: './summary-by-date.component.css'
})
export class SummaryByDateComponent implements OnChanges {

  @Input() importId!: number;

  @Input() dataInicio!: string;

  @Input() dataFim!: string;

  protected isLoading = false;

  protected summaryData: any[] = [];

  public chartOptions: Partial<ChartOptions> = {
    series: [],

    chart: {
      type: 'line',
      height: 350
    },

    stroke: {
      curve: 'smooth' as const,
      width: 3
    },

    dataLabels: {
      enabled: false
    },

    xaxis: {
      categories: []
    },

    legend: {
      position: 'top'
    },

    tooltip: {
      shared: true
    },

    title: {
      text: 'Evolução Financeira'
    }
  };

  constructor(
    private readonly http: HttpClient
  ) {}

  ngOnChanges(): void {

    if (
      this.importId &&
      this.dataInicio &&
      this.dataFim
    ) {
      this.loadData();
    }
  }

  private loadData(): void {

    this.isLoading = true;

    const params = new HttpParams()
      .set('csv_import_id', this.importId)
      .set('data_inicio', this.dataInicio)
      .set('data_fim', this.dataFim);

    this.http.get<any[]>(
      `http://localhost:8000/api/summary-by-date`,
      { params }
    )
    .subscribe({

      next: (response) => {

        this.summaryData = response;

        const categories = response.map(
          item => item.data
        );

        const recebimentos = response.map(
          item => Number(item.recebimentos)
        );

        const pagamentos = response.map(
          item => Number(item.pagamentos)
        );

        const liquido = response.map(
          item => Number(item.liquido)
        );

        this.chartOptions = {

          ...this.chartOptions,

          series: [
            {
              name: 'Recebimentos',
              data: recebimentos
            },
            {
              name: 'Pagamentos',
              data: pagamentos
            },
            {
              name: 'Líquido',
              data: liquido
            }
          ],

          xaxis: {
            categories
          }
        };

        this.isLoading = false;
      },

      error: () => {

        this.isLoading = false;
      }
    });
  }

  protected toCurrency(value: string): string {

    return Number(value).toLocaleString(
      'pt-BR',
      {
        style: 'currency',
        currency: 'BRL'
      }
    );
  }

  protected formatDate(date: string): string {

    return new Date(date)
      .toLocaleDateString('pt-BR');
  }
}