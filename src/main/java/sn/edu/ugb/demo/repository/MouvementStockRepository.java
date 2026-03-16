package sn.edu.ugb.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sn.edu.ugb.demo.entity.MouvementStock;

public interface MouvementStockRepository
        extends JpaRepository<MouvementStock, Long> {
    @Query("SELECT SUM(s.quantite) FROM MouvementStock  s WHERE s.type = 'ENTREE'")
    Integer totalEntrees();

    @Query("SELECT SUM(s.quantite) FROM MouvementStock s WHERE s.type = 'SORTIE'")
    Integer totalSorties();
}