import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';

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

  protected origins: any[] = [];

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

    const params = new HttpParams()
      .set('data_inicio', this.dataInicio)
      .set('data_fim', this.dataFim);

    this.http.get<any[]>(
      `http://localhost:8000/api/origin-summary/${this.importId}`,
      { params }
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