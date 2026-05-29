import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InsuranceImportService {

  private readonly apiBaseUrl = 'http://localhost:8000/api';

  constructor(
    private readonly httpClient: HttpClient
  ) {}

  uploadCsvFile(file: File, identifier: string) {

    const formData = new FormData();

    formData.append('file', file);
    formData.append('identifier', identifier);

    return this.httpClient.post(
      `${this.apiBaseUrl}/financial/import`,
      formData
    );
  }

  fetchImports() {
    return this.httpClient.get<any[]>(
      `${this.apiBaseUrl}/insurance/imports`
    );
  }
}