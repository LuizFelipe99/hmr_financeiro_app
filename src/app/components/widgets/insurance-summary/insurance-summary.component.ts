import {
  Component,
  Input,
  OnChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';

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

    const params = new HttpParams()
      .set('data_inicio', this.dataInicio)
      .set('data_fim', this.dataFim);

    this.http.get<any[]>(
      `http://localhost:8000/api/insurance-summary/${this.importId}`,
      { params }
    )
    .subscribe({

      next: (response) => {

        this.insurances = response;

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

  protected getTotalLiquido(): number {

    return this.insurances.reduce(
      (acc, item) => acc + Number(item.liquido),
      0
    );
  }
}