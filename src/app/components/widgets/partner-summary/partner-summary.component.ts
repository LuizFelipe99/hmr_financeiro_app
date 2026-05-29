import {
  Component,
  Input,
  OnChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-partner-summary',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './partner-summary.component.html',
  styleUrl: './partner-summary.component.css'
})
export class PartnerSummaryComponent implements OnChanges {

  @Input() importId!: number;

  protected partners: any[] = [];

  protected isLoading = false;

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
      `http://127.0.0.1:8000/api/financial/summary/insurance/partner/${this.importId}`,
      body
    )
    .subscribe({

      next: (response) => {

        this.partners = response.sort(
          (a, b) =>
            Number(b.liquido) - Number(a.liquido)
        );

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