import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { InsuranceImportService } from '../../services/insurance-import.service';

@Component({
  selector: 'app-insurance-import-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './insurance-import-list.component.html',
  styleUrl: './insurance-import-list.component.css'
})
export class InsuranceImportListComponent implements OnInit {

  protected imports: any[] = [];

  protected isLoading = false;

  protected displayedColumns = [
    'identifier',
    'file_name',
    'status',
    'total_rows',
    'created_at',
    'actions'
  ];

  constructor(
    private readonly insuranceImportService: InsuranceImportService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadImports();
  }

  protected loadImports(): void {

    this.isLoading = true;

    this.insuranceImportService
      .fetchImports()
      .subscribe({
        next: (response) => {
          this.imports = response;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;

          this.snackBar.open(
            'Erro ao carregar importações.',
            'Fechar',
            { duration: 4000 }
          );
        }
      });
  }

  protected navigateToDashboard(importId: number): void {
    this.router.navigate(['/dashboard', importId]);
  }
}