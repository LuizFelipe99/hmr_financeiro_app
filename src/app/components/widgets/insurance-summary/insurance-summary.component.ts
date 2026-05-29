import {
  Component,
  Input,
  OnChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-insurance-summary',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './insurance-summary.component.html',
  styleUrl: './insurance-summary.component.css'
})
export class InsuranceSummaryComponent implements OnChanges {

  @Input() importId!: number;

  @Input() dataInicio!: string;

  @Input() dataFim!: string;

  protected insurances: any[] = [];

  protected totalLiquido = 0;

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

    this.http.get<any>(
      `http://127.0.0.1:8000/api/financial/summary/insurance/supplier/${this.importId}`
    )
    .subscribe({

      next: (response) => {

        this.insurances = response.data;

        this.totalLiquido = response.total_liquido;

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

  protected parseNumber(value: string): number {

    return Number(value);
  }
}