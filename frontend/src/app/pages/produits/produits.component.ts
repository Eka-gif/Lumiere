import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import { CategorieService } from '../../services/categorie.service';
import { Produit } from '../../models/produit';
import { FormsModule } from '@angular/forms';
import {CommonModule, NgIf} from '@angular/common';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf],
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  produits: Produit[] = [];
  categories: any[] = [];

  message: string = '';

  isEdit: boolean = false;

  searchTerm: string = '';
  selectedCategory: string = '';
  produitASupprimer: any = null;
  modalSuppression = false;
  page = 0;
  size = 5;
  totalPages = 0;
  modalStock = false;

  typeMouvement = '';

  quantiteMouvement = 0;

  produitStock:any = {};
  newProduit: Produit = {
    id: undefined,
    nom: '',
    prix: 0,
    quantite: 0,
    description: '',
    categorie: undefined
  };

  constructor(
    private http: HttpClient,
    private produitService: ProduitService,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    this.loadProduits();
    this.loadCategories();
  }



  loadProduits() {

    this.http
      .get<any>(`http://localhost:8080/api/produits?page=${this.page}&size=${this.size}`)
      .subscribe(data => {

        this.produits = data.content;
        this.totalPages = data.totalPages;

      });

  }

  nextPage() {

    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadProduitsOrCategory();
    }

  }

  previousPage() {

    if (this.page > 0) {
      this.page--;
      this.loadProduitsOrCategory();
    }

  }



  loadCategories(): void {

    this.categorieService.getAll().subscribe({
      next: (data) => {
        this.categories = data;

      },
      error: (err) => {
        console.error("Erreur chargement catégories:", err);
      }
    });

  }



  showMessage(text: string) {

    this.message = text;

    setTimeout(() => {
      this.message = '';
    }, 3000);

  }



  addProduit() {

    if (!this.newProduit.categorie) {
      this.showMessage("Veuillez sélectionner une catégorie");
      return;
    }

    if (this.isEdit && this.newProduit.id !== undefined) {

      this.produitService.updateProduit(this.newProduit.id, this.newProduit)
        .subscribe(updated => {

          const index = this.produits.findIndex(p => p.id === updated.id);

          if (index !== -1) {
            this.produits[index] = updated;
          }

          this.showMessage("Produit modifié avec succès");

          this.resetForm();

        });

    } else {

      this.produitService.addProduit(this.newProduit)
        .subscribe(added => {

          this.produits.unshift(added);

          this.showMessage("Produit ajouté avec succès");

          this.resetForm();

        });

    }

  }



  editProduit(produit: Produit) {

    this.newProduit = {
      id: produit.id,
      nom: produit.nom,
      prix: produit.prix,
      quantite: produit.quantite,
      description: produit.description,
      categorie: produit.categorie
    };

    this.isEdit = true;

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
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
      description: '',
      categorie: undefined
    };

    this.isEdit = false;

  }



  ouvrirModalSuppression(produit:any){
    console.log("click supprimer", produit);
    this.produitASupprimer = produit;

    this.modalSuppression = true;

  }

  isAdmin(): boolean {

    const token = localStorage.getItem('token');

    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1]));

    return payload.role === 'ROLE_ADMIN';

  }

  fermerModalSuppression(){

    this.modalSuppression = false;

  }

  searchProduits() {

    if (this.searchTerm.trim() === '') {
      this.loadProduits();
      return;
    }

    this.http
      .get<any[]>(`http://localhost:8080/api/produits/search?nom=${this.searchTerm}`)
      .subscribe(data => {

        this.produits = data;

      });

  }



  filterByCategory() {
    this.page = 0;
    this.loadProduitsOrCategory()
  }

  ouvrirEntree(produit:any){
    console.log("Entrée stock", produit);
    this.produitStock = produit;

    this.typeMouvement = 'ENTREE';

    this.modalStock = true;

  }

  ouvrirSortie(produit:any){
    console.log("SORTIE stock", produit);
    this.produitStock = produit;

    this.typeMouvement = 'SORTIE';

    this.modalStock = true;

  }

  enregistrerMouvement(){

    const mouvement = {
      produitId: this.produitStock.id,
      type: this.typeMouvement,
      quantite: this.quantiteMouvement
    };


    if(this.typeMouvement === "ENTREE"){
    this.http.post(
      `http://localhost:8080/api/stock/entree/${this.produitStock.id}/${this.quantiteMouvement}`,
      {}
    ).subscribe(()=>{

      this.loadProduits();

      this.modalStock = false;

    });

  }


  if(this.typeMouvement === "SORTIE"){
    this.http.post(
`     http://localhost:8080/api/stock/sortie/${this.produitStock.id}/${this.quantiteMouvement}`,
      {}
        ).subscribe(()=>{

          this.loadProduits();

            this.modalStock = false;

            });

            }
  }

  loadProduitsOrCategory() {

    if (!this.selectedCategory) {

      this.loadProduits();

    } else {

      this.http
        .get<any[]>(`http://localhost:8080/api/categories/${this.selectedCategory}/produits`)
        .subscribe(data => {


          const allProduits = data;


          this.totalPages = Math.ceil(allProduits.length / this.size);


          const start = this.page * this.size;
          const end = start + this.size;

          this.produits = allProduits.slice(start, end);

        });

    }

  }

  confirmerSuppression(){

    this.produitService.deleteProduit(this.produitASupprimer.id)
      .subscribe(()=>{

        this.produits = this.produits.filter(
          p => p.id !== this.produitASupprimer.id
        );

        this.modalSuppression = false;

      });

  }
}
