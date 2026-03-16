import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuditLog } from '../models/audit-log';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  private apiUrl = "http://localhost:8080/api/audit";

  constructor(private http: HttpClient) {}

  getLogs(): Observable<AuditLog[]> {

    return this.http.get<AuditLog[]>(this.apiUrl);

  }

}
