package sn.edu.ugb.demo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sn.edu.ugb.demo.entity.MouvementStock;
import sn.edu.ugb.demo.entity.Produit;
import sn.edu.ugb.demo.repository.MouvementStockRepository;
import sn.edu.ugb.demo.repository.ProduitRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MouvementStockService {

    private final MouvementStockRepository mouvementRepository;
    private final ProduitRepository produitRepository;

    public List<MouvementStock> getAll() {
        return mouvementRepository.findAll();
    }

    public MouvementStock ajouterMouvement(MouvementStock mouvement) {

        Produit produit = produitRepository.findById(
                        mouvement.getProduit().getId())
                .orElseThrow(() -> new RuntimeException("Produit introuvable"));

        if (mouvement.getType().equalsIgnoreCase("ENTREE")) {
            produit.setQuantite(produit.getQuantite() + mouvement.getQuantite());
        } else if (mouvement.getType().equalsIgnoreCase("SORTIE")) {
            produit.setQuantite(produit.getQuantite() - mouvement.getQuantite());
        }

        produitRepository.save(produit);

        mouvement.setDate(LocalDateTime.now());

        return mouvementRepository.save(mouvement);
    }
}