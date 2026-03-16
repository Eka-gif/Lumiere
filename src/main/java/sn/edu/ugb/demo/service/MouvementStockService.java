package sn.edu.ugb.demo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sn.edu.ugb.demo.repository.MouvementStockRepository;


@Service
@RequiredArgsConstructor
public class MouvementStockService {
    private final MouvementStockRepository mouvementRepository;
    public Integer getTotalEntrees() {
        return mouvementRepository.totalEntrees();
    }
    public Integer getTotalSorties() {
        return mouvementRepository.totalSorties();
    }
}