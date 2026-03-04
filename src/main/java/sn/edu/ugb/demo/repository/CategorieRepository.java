package sn.edu.ugb.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.edu.ugb.demo.entity.Categorie;

public interface CategorieRepository extends JpaRepository<Categorie, Long> {
}