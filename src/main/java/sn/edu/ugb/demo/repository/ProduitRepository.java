package sn.edu.ugb.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sn.edu.ugb.demo.entity.Produit;
import java.util.List;

public interface ProduitRepository extends JpaRepository<Produit, Long> {
    long countByQuantiteLessThanEqual(int quantite);
    long countByCategorieId(Long categorieId);
    @Query("SELECT p.categorie.nom, COUNT(p) FROM Produit p GROUP BY p.categorie.nom")
    List<Object[]> countProductsByCategory();
    List<Produit> findByQuantiteLessThanEqual(int quantite);
    List<Produit> findTop5ByOrderByIdDesc();
    List<Produit> findByNomContainingIgnoreCase(String nom);

}