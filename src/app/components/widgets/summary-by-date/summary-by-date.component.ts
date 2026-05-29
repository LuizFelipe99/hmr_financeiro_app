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

import { HttpClient } from '@angular/common/http';
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

    if (this.importId) {
      this.loadData();
    }
  }

  private loadData(): void {

    this.isLoading = true;

    const body = {
      data_inicio: '2026-01-01',
      data_fim: '2026-05-30',

      categorias: [
        'ESTORNO',
        'Receitas de Serviços',
        'REPASSES A PARCEIROS'
      ],

      situacoes: [
        'Conciliado'
      ]
    };

    this.http.post<any[]>(
      `http://127.0.0.1:8000/api/financial/summary/insurance/date-range/${this.importId}`,
      body
    )
    .subscribe({

      next: (response) => {

        this.summaryData = response;

        const categories = response.map(
          item => this.formatDate(item.data)
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

  protected getTotalRecebimentos(): number {

    return this.summaryData.reduce(
      (acc, item) => acc + Number(item.recebimentos),
      0
    );
  }

  protected getTotalPagamentos(): number {

    return this.summaryData.reduce(
      (acc, item) => acc + Number(item.pagamentos),
      0
    );
  }

  protected getTotalLiquido(): number {

    return this.summaryData.reduce(
      (acc, item) => acc + Number(item.liquido),
      0
    );
  }
}