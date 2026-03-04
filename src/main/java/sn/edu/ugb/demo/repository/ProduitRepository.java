package sn.edu.ugb.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.edu.ugb.demo.entity.Produit;

public interface ProduitRepository extends JpaRepository<Produit, Long> {
}