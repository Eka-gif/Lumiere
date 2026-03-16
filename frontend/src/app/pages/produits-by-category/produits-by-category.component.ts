import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CommonModule, NgIf} from '@angular/common';
import { ProduitService } from '../../services/produit.service';
import {NgFor, SlicePipe} from '@angular/common';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-produits-by-category',
  standalone: true,
  imports: [NgFor, RouterLink, FormsModule, SlicePipe, NgIf],
  templateUrl: './produits-by-category.component.html',
  styleUrls: ['./produits-by-category.component.css']
})
export class ProduitsByCategoryComponent implements OnInit {

  produits: any[] = [];
  categoryId!: number;
  searchText: string = '';
  prixAsc: boolean = true;
  page = 0;
  pageSize = 5;
  modalOuvert = false;

  produitSelectionne:any = {};
  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService
  ) {}

  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));

    this.produitService.getProduitsByCategory(this.categoryId)
      .subscribe(data => {
        this.produits = data;
      });
  }

  produitsFiltres() {

    let list = this.produits.filter(p =>
      p.nom.toLowerCase().includes(this.searchText.toLowerCase())
    );

    return list;
  }

  trierPrix() {

    if(this.prixAsc){

      this.produits.sort((a,b) => a.prix - b.prix);

    }else{

      this.produits.sort((a,b) => b.prix - a.prix);

    }

    this.prixAsc = !this.prixAsc;

  }

  ouvrirModal(produit:any){

    this.produitSelectionne = {...produit};

    this.modalOuvert = true;

  }


  fermerModal(){

    this.modalOuvert = false;

  }


  sauvegarder(){

    this.produitService.updateProduit(
      this.produitSelectionne.id,
      this.produitSelectionne
    ).subscribe(()=>{

      const index = this.produits.findIndex(
        p => p.id === this.produitSelectionne.id
      );

      this.produits[index] = this.produitSelectionne;

      this.modalOuvert = false;

    });

  }


  supprimer(id:number){

    if(confirm("Supprimer ce produit ?")){

      this.produitService.deleteProduit(id)
        .subscribe(()=>{

          this.produits = this.produits.filter(
            p => p.id !== id
          );

        });

    }

  }
}
