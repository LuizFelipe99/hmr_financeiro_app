import {
  Component,
  Input,
  OnChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

interface GroupSummary {
  nome: string | null;
  total_clientes: number;
  valor_total: string;
}

interface NewCustomersSummaryResponse {
  group_by: string;
  total_geral: number;
  total_clientes: number;
  dados: GroupSummary[];
}

type GroupByOption = 'seguradora' | 'origem' | 'produtor' | 'ramo' | 'parceiro';

@Component({
  selector: 'app-new-customers-summary',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './new-customers-summary.component.html',
  styleUrl: './new-customers-summary.component.css'
})
export class NewCustomersSummaryComponent implements OnChanges {

  @Input() importId!: number;

  protected groups: GroupSummary[] = [];
  protected totalGeral = 0;
  protected isLoading = false;
  protected selectedGroupBy: GroupByOption = 'seguradora';

  protected readonly groupByOptions: { value: GroupByOption; label: string }[] = [
    { value: 'seguradora', label: 'Seguradora' },
    { value: 'origem',     label: 'Origem'     },
    { value: 'produtor',   label: 'Produtor'   },
    { value: 'ramo',       label: 'Ramo'       },
    { value: 'parceiro',   label: 'Parceiro'   }
  ];

  protected readonly groupColumns = ['nome', 'total_clientes', 'valor_total'];

  constructor(private readonly http: HttpClient) {}

  ngOnChanges(): void {
    if (!this.importId) return;
    this.loadData();
  }

  protected onGroupByChange(): void {
    this.loadData();
  }

  private loadData(): void {
    this.isLoading = true;

    const params = new HttpParams().set('group_by', this.selectedGroupBy);

    this.http.get<NewCustomersSummaryResponse>(
      `http://localhost:8000/api/new-customers-summary/${this.importId}`,
      { params }
    ).subscribe({
      next: (response) => {
        this.groups = response.dados ?? [];
        this.totalGeral = response.total_geral ?? 0;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  protected isNegative(value: string | number): boolean {
    return Number(value) < 0;
  }

  protected toCurrency(value: string | number): string {
    return Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }
}