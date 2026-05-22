import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CsvImportService } from '../../services/csv-import.service';

@Component({
  selector: 'app-csv-upload',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule,
    MatProgressBarModule,
  ],
  templateUrl: './csv-upload.component.html',
  styleUrl: './csv-upload.component.css'
})
export class CsvUploadComponent implements OnInit {
  protected importedUsers: any[] = [];
  protected isUploading = false;
  protected displayedColumns = ['name', 'email', 'nickname'];

  constructor(
    private readonly csvImportService: CsvImportService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadImportedUsers();
  }

  protected onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const selectedFile = inputElement.files?.[0];

    if (!selectedFile) return;

    this.isUploading = true;

    this.csvImportService.uploadCsvFile(selectedFile).subscribe({
      next: (response) => {
        this.isUploading = false;
        this.snackBar.open(
          `Importação concluída: ${response.imported} importados, ${response.skipped} ignorados`,
          'Fechar',
          { duration: 4000 }
        );
        this.loadImportedUsers();
      },
      error: () => {
        this.isUploading = false;
        this.snackBar.open('Erro ao importar o arquivo.', 'Fechar', { duration: 4000 });
      }
    });
  }

  private loadImportedUsers(): void {
    this.csvImportService.fetchImportedUsers().subscribe({
      next: (users) => this.importedUsers = users,
      error: () => this.snackBar.open('Erro ao carregar usuários.', 'Fechar', { duration: 4000 })
    });
  }
}