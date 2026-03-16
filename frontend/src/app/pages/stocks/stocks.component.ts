import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../models/stock';
import { ProduitService } from '../../services/produit.service';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  mouvements: Stock[] = [];
  produits:any[] = [];
  filteredStocks:any[] = [];
  loading: boolean = false;
  nouveauMouvement: Stock = {
    id:0,
    type: 'ENTREE',
    quantite: 0,
    date: new Date(),
    produit : {
      id:0,
      nom: ''
    }
  };

  constructor(private stockService: StockService,
              private produitService: ProduitService) {}

  ngOnInit(): void {
    this.charger();
    this.chargerTousProduits();
  }
  resetForm() {
    this.nouveauMouvement = {
      id:0,
      type: 'ENTREE',
      quantite: 0,
      date: new Date(),
      produit: {
        id : 0,
        nom: ''
      }
    };
  }
  chargerTousProduits() {
    this.loading = true;


    this.produitService.getAllForStock().subscribe({
      next: (data) => {
        this.produits = data;
        console.log("TOUS les produits chargés:", this.produits);
        console.log("Nombre total de produits:", this.produits.length);
        this.loading = false;
      },
      error: (err) => {
        console.error("Erreur chargement produits:", err);
        this.loading = false;
      }
    });
  }
  chargerProduits() {
    this.chargerTousProduits();
  }
  charger() {
    this.stockService.getAll()
      .subscribe(data => {this.mouvements = data;
      this.filteredStocks = data});
  }

  ajouter() {
    if (this.nouveauMouvement.quantite <= 0) {
      alert("La quantité doit être supérieure à 0");
      return;
    }

    if (!this.nouveauMouvement.produit || !this.nouveauMouvement.produit.id) {
      alert("Veuillez sélectionner un produit");
      return;
    }

    // CRÉER UN NOUVEL OBJET AVEC LA DATE ACTUELLE
    const mouvementWithDate = {
      ...this.nouveauMouvement,
      date: new Date()  // La date est générée MAINTENANT
    };

    console.log("Mouvement avec date actuelle:", mouvementWithDate);

    if (this.nouveauMouvement.id) {
      // Mode modification
      this.stockService.updateStock(
        this.nouveauMouvement.id,
        mouvementWithDate  // Envoyer l'objet avec la nouvelle date
      ).subscribe({
        next: () => {
          this.resetForm();
          this.charger();
        },
        error: () => {
          alert("Erreur lors de la modification");
        }
      });
    } else {
      // Mode création
      if (this.nouveauMouvement.type === 'ENTREE') {
        this.stockService
          .entree(this.nouveauMouvement.produit.id, this.nouveauMouvement.quantite)
          .subscribe({
            next: () => {
              this.resetForm();
              this.charger();
            },
            error: () => {
              alert("Erreur lors de l'entrée de stock");
            }
          });
      } else {
        this.stockService
          .sortie(this.nouveauMouvement.produit.id, this.nouveauMouvement.quantite)
          .subscribe({
            next: () => {
              this.resetForm();
              this.charger();
            },
            error: (err) => {
              if (err.error?.message) {
                alert(err.error.message);
              } else {
                alert("Stock insuffisant");
              }
            }
          });
      }
    }
  }

}
