import {
  Component,
  Input,
  OnChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-producer-summary',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './producer-summary.component.html',
  styleUrl: './producer-summary.component.css'
})
export class ProducerSummaryComponent implements OnChanges {

  @Input() importId!: number;

  @Input() dataInicio!: string;

  @Input() dataFim!: string;

  protected producers: any[] = [];

  protected totalRecords = 0;

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
      `http://127.0.0.1:8000/api/financial/summary/insurance/producer/${this.importId}`
    )
    .subscribe({

      next: (response) => {

        this.totalRecords = response.total_records;

        this.producers = response.data.sort(
          (a: any, b: any) =>
            Number(b.liquido) - Number(a.liquido)
        );

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