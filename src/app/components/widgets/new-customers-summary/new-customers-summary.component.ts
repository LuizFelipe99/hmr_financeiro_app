import {
  Component,
  Input,
  OnChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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

type GroupByOption =
  | 'seguradora'
  | 'origem'
  | 'produtor'
  | 'ramo'
  | 'parceiro';

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

  protected totalClientes = 0;

  protected isLoading = false;

  protected selectedGroupBy: GroupByOption = 'seguradora';

  protected readonly groupByOptions = [
    {
      value: 'seguradora' as GroupByOption,
      label: 'Seguradora'
    },
    {
      value: 'origem' as GroupByOption,
      label: 'Origem'
    },
    {
      value: 'produtor' as GroupByOption,
      label: 'Produtor'
    },
    {
      value: 'ramo' as GroupByOption,
      label: 'Ramo'
    },
    {
      value: 'parceiro' as GroupByOption,
      label: 'Parceiro'
    }
  ];

  protected readonly groupColumns = [
    'nome',
    'total_clientes',
    'valor_total'
  ];

  constructor(
    private readonly http: HttpClient
  ) {}

  ngOnChanges(): void {

    if (!this.importId) {
      return;
    }

    this.loadData();
  }

  protected onGroupByChange(): void {

    this.loadData();
  }

  private loadData(): void {

    this.isLoading = true;

    const body = {

      group_by: this.selectedGroupBy,

      data_inicio: '2025-01-01',

      data_fim: '2026-12-31',

      categorias: [
        'ESTORNO',
        'Receitas de Serviços',
        'REPASSES A PARCEIROS'
      ],

      situacoes: [
        'Conciliado'
      ]
    };

    this.http.post<NewCustomersSummaryResponse>(
      `http://127.0.0.1:8000/api/financial/summary/insurance/new-customers/${this.importId}`,
      body
    )
    .subscribe({

      next: (response) => {

        this.groups = response.dados ?? [];

        this.totalGeral = response.total_geral ?? 0;

        this.totalClientes = response.total_clientes ?? 0;

        this.isLoading = false;
      },

      error: () => {

        this.isLoading = false;
      }
    });
  }

  protected isNegative(
    value: string | number
  ): boolean {

    return Number(value) < 0;
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