package sn.edu.ugb.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sn.edu.ugb.demo.entity.Produit;
import sn.edu.ugb.demo.repository.ProduitRepository;
import sn.edu.ugb.demo.service.AdminService;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    private ProduitRepository produitRepository;

    public AdminController(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }
    @GetMapping("/stats")
    public Map<String, Long> getStats() {
        return adminService.getStats();
    }

    @GetMapping("/products-by-category")
    public Map<String, Long> getProductsByCategory() {
        return adminService.getProductsByCategory();
    }

    @GetMapping("/low-stock")
    public List<Produit> getLowStockProducts() {
        return produitRepository.findByQuantiteLessThanEqual(5);
    }

    @GetMapping("/recent-products")
    public List<Produit> getRecentProducts() {
        return produitRepository.findTop5ByOrderByIdDesc();
    }
}
