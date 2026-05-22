import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { InsuranceImportService } from '../../services/insurance-import.service';

import { InsuranceImportListComponent } from '../../components/insurance-import-list/insurance-import-list.component';

@Component({
  selector: 'app-insurance-import',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    MatButtonModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,

    InsuranceImportListComponent
  ],
  templateUrl: './insurance-import.component.html',
  styleUrl: './insurance-import.component.css'
})
export class InsuranceImportComponent {

  protected isUploading = false;

  protected identifier = '';

  protected importResult: any = null;

  constructor(
    private readonly insuranceImportService: InsuranceImportService,
    private readonly snackBar: MatSnackBar
  ) {}

  protected onFileSelected(event: Event): void {

    const inputElement = event.target as HTMLInputElement;
    const selectedFile = inputElement.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (!this.identifier.trim()) {
      this.snackBar.open(
        'Informe um identificador para o arquivo.',
        'Fechar',
        { duration: 4000 }
      );

      return;
    }

    this.isUploading = true;

    this.insuranceImportService
      .uploadCsvFile(selectedFile, this.identifier)
      .subscribe({
        next: (response) => {

          this.importResult = response;

          this.snackBar.open(
            'Importação realizada com sucesso!',
            'Fechar',
            { duration: 4000 }
          );

          this.isUploading = false;
        },

        error: () => {

          this.isUploading = false;

          this.snackBar.open(
            'Erro ao importar arquivo.',
            'Fechar',
            { duration: 4000 }
          );
        }
      });
  }
}