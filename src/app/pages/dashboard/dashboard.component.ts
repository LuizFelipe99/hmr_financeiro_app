import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { OriginSummaryComponent } from '../../components/widgets/origin-summary/origin-summary.component';
import { InsuranceSummaryComponent } from '../../components/widgets/insurance-summary/insurance-summary.component';
import { ProducerSummaryComponent } from '../../components/widgets/producer-summary/producer-summary.component';
import { RamoSummaryComponent } from '../../components/widgets/ramo-summary/ramo-summary.component';
import { SummaryByDateComponent } from '../../components/widgets/summary-by-date/summary-by-date.component';
import { PartnerSummaryComponent } from '../../components/widgets/partner-summary/partner-summary.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    OriginSummaryComponent,
    InsuranceSummaryComponent,
    ProducerSummaryComponent,
    RamoSummaryComponent,
    SummaryByDateComponent,
    PartnerSummaryComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  protected importId!: number;

  protected dataInicio = '2026-05-11';
  protected dataFim = '2026-05-15';

  protected totalRecebimentos = 0;
  protected totalPagamentos = 0;
  protected totalLiquido = 0;
  protected totalRegistros = 0;

  constructor(
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.importId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadDashboard();
  }

  protected loadDashboard(): void {

    /**
     * futuramente:
     * carregar KPIs gerais aqui
     */

  }
}