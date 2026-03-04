package sn.edu.ugb.demo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import sn.edu.ugb.demo.entity.Categorie;
import sn.edu.ugb.demo.entity.Produit;
import sn.edu.ugb.demo.repository.CategorieRepository;
import sn.edu.ugb.demo.service.CategorieService;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategorieController {

    private final CategorieService categorieService;
    private final CategorieRepository categorieRepository;
    @GetMapping
    public List<Categorie> getAll() {
        return categorieService.getAll();
    }

    @GetMapping("/{id}")
    public Categorie getById(@PathVariable Long id) {
        return categorieService.getById(id);
    }

    @PostMapping
    public Categorie create(@RequestBody Categorie categorie) {
        return categorieService.save(categorie);
    }

    @PutMapping("/{id}")
    public Categorie update(@PathVariable Long id,
                            @RequestBody Categorie categorie) {
        categorie.setId(id);
        return categorieService.save(categorie);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        categorieService.delete(id);
    }

    @GetMapping("/{id}/produits")
    public List<Produit> getProduitsByCategory(@PathVariable Long id) {
        Categorie category = categorieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        return category.getProduits();
    }
}