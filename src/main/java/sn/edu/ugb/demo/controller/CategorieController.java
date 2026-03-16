package sn.edu.ugb.demo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import sn.edu.ugb.demo.entity.Categorie;
import sn.edu.ugb.demo.entity.Produit;
import sn.edu.ugb.demo.repository.CategorieRepository;
import sn.edu.ugb.demo.service.CategorieService;
import sn.edu.ugb.demo.service.AuditService;  // AJOUTER L'IMPORT

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategorieController {

    private final CategorieService categorieService;
    private final CategorieRepository categorieRepository;
    private final AuditService auditService;

    private String getCurrentUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @GetMapping
    public List<Categorie> getAll() {
        String username = getCurrentUsername();
        auditService.log(username, "VIEW", "Categorie");

        return categorieService.getAll();
    }

    @GetMapping("/{id}")
    public Categorie getById(@PathVariable Long id) {

        String username = getCurrentUsername();
        auditService.log(username, "VIEW", "Categorie");

        return categorieService.getById(id);
    }

    @PostMapping
    public Categorie create(@RequestBody Categorie categorie) {
        Categorie savedCategorie = categorieService.save(categorie);

        String username = getCurrentUsername();
        auditService.log(username, "CREATE", "Categorie");

        return savedCategorie;
    }

    @PutMapping("/{id}")
    public Categorie update(@PathVariable Long id,
                            @RequestBody Categorie categorie) {

        categorie.setId(id);
        Categorie updatedCategorie = categorieService.save(categorie);

        String username = getCurrentUsername();
        auditService.log(username, "UPDATE", "Categorie");

        return updatedCategorie;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        categorieService.delete(id);

        String username = getCurrentUsername();
        auditService.log(username, "DELETE", "Categorie");
    }

    @GetMapping("/{id}/produits")
    public List<Produit> getProduitsByCategory(@PathVariable Long id) {
        Categorie category = categorieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        String username = getCurrentUsername();
        auditService.log(username, "VIEW_PRODUCTS", "Categorie");

        return category.getProduits();
    }
}