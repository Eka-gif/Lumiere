package sn.edu.ugb.demo.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import sn.edu.ugb.demo.entity.MouvementStock;
import sn.edu.ugb.demo.entity.Produit;
import sn.edu.ugb.demo.repository.MouvementStockRepository;
import sn.edu.ugb.demo.repository.ProduitRepository;
import sn.edu.ugb.demo.service.MouvementStockService;
import sn.edu.ugb.demo.service.AuditService;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/stock")
@CrossOrigin("*")
public class StockController {

    private final MouvementStockRepository mouvementRepository;
    private final ProduitRepository produitRepository;
    private final MouvementStockService mouvementStockService;
    private final AuditService auditService;

    public StockController(MouvementStockRepository mouvementRepository,
                           ProduitRepository produitRepository,
                           MouvementStockService mouvementStockService,
                           AuditService auditService) {
        this.mouvementRepository = mouvementRepository;
        this.produitRepository = produitRepository;
        this.mouvementStockService = mouvementStockService;
        this.auditService = auditService;
    }

    private String getCurrentUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @PostMapping("/entree/{produitId}/{quantite}")
    public Produit entreeStock(@PathVariable Long produitId, @PathVariable int quantite) {

        Produit produit = produitRepository.findById(produitId).orElseThrow();
        produit.setQuantite(produit.getQuantite() + quantite);

        MouvementStock m = new MouvementStock();
        m.setProduit(produit);
        m.setQuantite(quantite);
        m.setType("ENTREE");
        m.setDate(LocalDateTime.now());
        mouvementRepository.save(m);
        Produit savedProduit = produitRepository.save(produit);


        String username = getCurrentUsername();
        auditService.log(username, "ENTREE_STOCK", "Produit");

        return savedProduit;
    }

    @PostMapping("/sortie/{produitId}/{quantite}")
    public Produit sortieStock(@PathVariable Long produitId, @PathVariable int quantite) {

        Produit produit = produitRepository.findById(produitId).orElseThrow();
        produit.setQuantite(produit.getQuantite() - quantite);

        MouvementStock m = new MouvementStock();
        m.setProduit(produit);
        m.setQuantite(quantite);
        m.setType("SORTIE");
        m.setDate(LocalDateTime.now());
        mouvementRepository.save(m);
        Produit savedProduit = produitRepository.save(produit);

        String username = getCurrentUsername();
        auditService.log(username, "SORTIE_STOCK", "Produit");

        return savedProduit;
    }

    @DeleteMapping("/{id}")
    public void deleteStock(@PathVariable Long id) {
        mouvementRepository.deleteById(id);

        String username = getCurrentUsername();
        auditService.log(username, "DELETE", "MouvementStock");
    }

    @GetMapping
    public List<MouvementStock> getAll() {
        String username = getCurrentUsername();
        auditService.log(username, "VIEW", "MouvementStock");

        return mouvementRepository.findAll();
    }

    @GetMapping("/total-entrees")
    public Integer totalEntrees() {
        return mouvementStockService.getTotalEntrees();
    }

    @GetMapping("/total-sorties")
    public Integer totalSorties() {
        return mouvementStockService.getTotalSorties();
    }
}