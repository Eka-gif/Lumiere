import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../models/stock';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Gestion du Stock</h2>

    <select [(ngModel)]="nouveauMouvement.type">
      <option value="ENTREE">Entrée</option>
      <option value="SORTIE">Sortie</option>
    </select>

    <input type="number"
           [(ngModel)]="nouveauMouvement.quantite"
           placeholder="Quantité">

    <input type="number"
           [(ngModel)]="nouveauMouvement.produitId"
           placeholder="ID Produit">

    <button (click)="ajouter()">Valider</button>

    <ul>
      <li *ngFor="let m of mouvements">
        {{ m.type }} - {{ m.quantite }}
      </li>
    </ul>
  `
})
export class StocksComponent implements OnInit {

  mouvements: Stock[] = [];

  nouveauMouvement: Stock = {
    type: 'ENTREE',
    quantite: 0,
    produitId: 0
  };

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.charger();
  }

  charger() {
    this.stockService.getAll()
      .subscribe(data => this.mouvements = data);
  }

  ajouter() {
    this.stockService.create(this.nouveauMouvement)
      .subscribe(() => {
        this.nouveauMouvement = {
          type: 'ENTREE',
          quantite: 0,
          produitId: 0
        };
        this.charger();
      });
  }
}
