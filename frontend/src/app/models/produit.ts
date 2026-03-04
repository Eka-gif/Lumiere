export interface Produit {
  id?: number;
  nom: string;
  prix: number;
  quantite: number;
  description: string;
  categorie?: {
    id: number;
    nom: string;
  };
}
