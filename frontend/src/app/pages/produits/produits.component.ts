import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import { Produit } from '../../models/produit';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';


@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf],
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  produits: Produit[] = [];
  message: string = '';
  isEdit: boolean = false;

  newProduit: Produit = {
    id: undefined,
    nom: '',
    prix: 0,
    quantite: 0,

    description: ''
  };

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits(): void {
    this.produitService.getProduits().subscribe({
      next: (data: any) => {
        console.log("Réponse API:", data);


        this.produits = data.content;
      },
      error: (err) => {
        console.error("Erreur chargement produits:", err);
        this.message = "Erreur lors du chargement des produits";
      }
    });
  }

  addProduit() {

    if (this.isEdit && this.newProduit.id !== undefined) {

      this.produitService.updateProduit(this.newProduit.id, this.newProduit)
        .subscribe(updated => {


          const index = this.produits.findIndex(p => p.id === updated.id);
          if (index !== -1) {
            this.produits[index] = updated;
          }

          this.message = "Produit modifié avec succès";
          this.resetForm();
        });

    } else {

      this.produitService.addProduit(this.newProduit)
        .subscribe(added => {


          this.produits.unshift(added);


          this.message = "Produit ajouté avec succès";
          this.resetForm();
        });

    }

  }



  editProduit(produit: Produit) {
    this.newProduit = { ...produit };
    this.isEdit = true;
  }

  deleteProduit(id: number) {
    this.produitService.deleteProduit(id).subscribe(() => {
      this.message = "Produit supprimé";
      this.loadProduits();
    });
  }

  cancelEdit() {
    this.resetForm();
  }

  resetForm() {
    this.newProduit = {
      id: undefined,
      nom: '',
      prix: 0,
      quantite: 0,
      description: ''
    };
    this.isEdit = false;
  }

}
