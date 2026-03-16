import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private apiUrl = 'http://localhost:8080/api/stock';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  entree(produitId: number, quantite: number) {
    return this.http.post(`${this.apiUrl}/entree/${produitId}/${quantite}`, {});
  }

  sortie(produitId: number, quantite: number) {
    return this.http.post(`${this.apiUrl}/sortie/${produitId}/${quantite}`, {});
  }

  getTotalEntrees() {
    return this.http.get<number>('http://localhost:8080/api/stock/total-entrees');
  }

  getTotalSorties() {
    return this.http.get<number>('http://localhost:8080/api/stock/total-sorties');
  }
  updateStock(id:number, stock:any){
    return this.http.put(
      `http://localhost:8080/api/stock/${id}`,
      stock
    );
  }
}
