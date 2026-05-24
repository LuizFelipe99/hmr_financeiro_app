import {
  Component,
  Input,
  OnChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';

import {
  MatProgressSpinnerModule
} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-new-customers-summary',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './new-customers-summary.component.html',
  styleUrl: './new-customers-summary.component.css'
})
export class NewCustomersSummaryComponent implements OnChanges {

  @Input() importId!: number;

  protected customers: any[] = [];

  protected totalGeral = 0;

  protected isLoading = false;

  protected displayedColumns = [
    'descricao',
    'seguradora',
    'parcela',
    'valor_recebido'
  ];

  protected isNegative(value: string | number): boolean {

  return Number(value) < 0;
}
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

    this.http.get<any>(
      `http://localhost:8000/api/new-customers-summary/${this.importId}`
    )
    .subscribe({

      next: (response) => {

        this.customers = response.clientes || [];

        this.totalGeral = Number(response.total_geral || 0);

        this.isLoading = false;
      },

      error: () => {

        this.isLoading = false;
      }
    });
  }

  protected toCurrency(value: string | number): string {

    return Number(value).toLocaleString(
      'pt-BR',
      {
        style: 'currency',
        currency: 'BRL'
      }
    );
  }
}