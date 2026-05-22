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

    this.http.get<any[]>(
      `http://localhost:8000/api/partner-summary/${this.importId}`
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