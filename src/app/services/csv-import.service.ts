import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsvImportService {
  private readonly apiBaseUrl = 'http://localhost:8000/api';

  constructor(private readonly httpClient: HttpClient) {}

  uploadCsvFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post(`${this.apiBaseUrl}/csv-import`, formData);
  }

  fetchImportedUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiBaseUrl}/imported-users`);
  }
}