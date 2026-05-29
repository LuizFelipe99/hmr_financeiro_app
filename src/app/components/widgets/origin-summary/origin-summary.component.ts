import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface OriginSummary {
  origem: string;
  total_registros: number;
  recebimentos: string;
  pagamentos: string;
  liquido: string;
}

@Component({
  selector: 'app-origin-summary',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './origin-summary.component.html',
  styleUrl: './origin-summary.component.css'
})
export class OriginSummaryComponent implements OnChanges {

  @Input() importId!: number;

  @Input() dataInicio!: string;

  @Input() dataFim!: string;

  protected origins: OriginSummary[] = [];

  protected isLoading = false;

  constructor(
    private readonly http: HttpClient
  ) {}

  ngOnChanges(changes: SimpleChanges): void {

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

    const body = {
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

    this.http.post<OriginSummary[]>(
      `http://127.0.0.1:8000/api/financial/summary/insurance/origin/${this.importId}`,
      body
    )
    .subscribe({

      next: (response) => {

        this.origins = response;

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
}