export interface Stock {
  id: number;
  type: 'ENTREE' | 'SORTIE';
  quantite: number;
  produit:{
    id: number;
    nom:String;
}
  date?: Date;
}
