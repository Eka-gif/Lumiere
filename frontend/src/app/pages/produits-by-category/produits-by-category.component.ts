import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { ProduitService } from '../../services/produit.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-produits-by-category',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './produits-by-category.component.html'
})
export class ProduitsByCategoryComponent implements OnInit {

  produits: any[] = [];
  categoryId!: number;

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
}
