package sn.edu.ugb.demo.service;

import org.springframework.stereotype.Service;
import sn.edu.ugb.demo.entity.Produit;
import sn.edu.ugb.demo.repository.ProduitRepository;

import java.util.List;

@Service
public class ProduitService {

    private final ProduitRepository produitRepository;

    public ProduitService(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    public List<Produit> findAll() {
        return produitRepository.findAll();
    }

    public Produit findById(Long id) {
        return produitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit non trouvé"));
    }

    public Produit save(Produit produit) {
        return produitRepository.save(produit);
    }

    public Produit update(Long id, Produit produit) {
        Produit existing = findById(id);

        existing.setNom(produit.getNom());
        existing.setPrix(produit.getPrix());
        existing.setQuantite(produit.getQuantite());
        existing.setDescription(produit.getDescription());

        return produitRepository.save(existing);
    }

    public void delete(Long id) {
        produitRepository.deleteById(id);
    }
}
