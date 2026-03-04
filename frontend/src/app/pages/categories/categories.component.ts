import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CategorieService } from '../../services/categorie.service';
import { Categorie } from '../../models/categorie';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {

  categories: Categorie[] = [];
  nouvelleCategorie: Categorie = { nom: '' };

  constructor(private categorieService: CategorieService) {}

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.categorieService.getAll()
      .subscribe({
        next: (data) => this.categories = data,
        error: (err) => console.error('Erreur chargement catégories', err)
      });
  }

  ajouter(): void {
    if (!this.nouvelleCategorie.nom) return;

    this.categorieService.create(this.nouvelleCategorie)
      .subscribe({
        next: () => {
          this.nouvelleCategorie = { nom: '' };
          this.charger();
        },
        error: (err) => console.error('Erreur ajout catégorie', err)
      });
  }

  supprimer(id: number): void {
    this.categorieService.delete(id)
      .subscribe({
        next: () => this.charger(),
        error: (err) => console.error('Erreur suppression catégorie', err)
      });
  }
}
