package sn.edu.ugb.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.edu.ugb.demo.entity.MouvementStock;

public interface MouvementStockRepository
        extends JpaRepository<MouvementStock, Long> {
}