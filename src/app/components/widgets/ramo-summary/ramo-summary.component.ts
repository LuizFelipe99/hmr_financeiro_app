import {
  Component,
  Input,
  OnChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ramo-summary',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './ramo-summary.component.html',
  styleUrl: './ramo-summary.component.css'
})
export class RamoSummaryComponent implements OnChanges {

  @Input() importId!: number;

  @Input() dataInicio!: string;

  @Input() dataFim!: string;

  protected ramos: any[] = [];

  protected isLoading = false;

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

    const payload = {

      data_inicio: this.dataInicio,

      data_fim: this.dataFim,

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
      `http://127.0.0.1:8000/api/financial/summary/insurance/ramo/${this.importId}`,
      payload
    )
    .subscribe({

      next: (response) => {

        this.ramos = response.sort(
          (a, b) =>
            Number(b.liquido) -
            Number(a.liquido)
        );

        this.isLoading = false;
      },

      error: () => {

        this.isLoading = false;
      }
    });
  }

  protected toCurrency(
    value: string | number
  ): string {

    return Number(value).toLocaleString(
      'pt-BR',
      {
        style: 'currency',
        currency: 'BRL'
      }
    );
  }
}