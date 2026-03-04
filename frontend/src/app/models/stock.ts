export interface Stock {
  id?: number;
  type: 'ENTREE' | 'SORTIE';
  quantite: number;
  produitId: number;
  date?: string;
}
