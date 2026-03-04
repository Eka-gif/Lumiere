package sn.edu.ugb.demo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import sn.edu.ugb.demo.entity.Produit;
import sn.edu.ugb.demo.repository.ProduitRepository;


import java.util.List;

@Service
@RequiredArgsConstructor
public class ProduitService {

    private final ProduitRepository produitRepository;

    public Page<Produit> getAll(Pageable pageable) {
        return produitRepository.findAll(pageable);
    }

    public Produit getProduitById(Long id) {
        return produitRepository.findById(id).orElse(null);
    }

    public Produit saveProduit(Produit produit) {
        return produitRepository.save(produit);
    }

    public Produit updateProduit(Long id, Produit produit) {
        Produit p = produitRepository.findById(id).orElseThrow();
        p.setNom(produit.getNom());
        p.setPrix(produit.getPrix());
        p.setQuantite(produit.getQuantite());
        p.setDescription(produit.getDescription());
        return produitRepository.save(p);
    }

    public void deleteProduit(Long id) {
        produitRepository.deleteById(id);
    }
}