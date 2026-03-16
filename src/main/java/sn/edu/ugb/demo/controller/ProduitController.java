package sn.edu.ugb.demo.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import sn.edu.ugb.demo.entity.Produit;
import sn.edu.ugb.demo.repository.ProduitRepository;
import sn.edu.ugb.demo.service.AuditService;
import sn.edu.ugb.demo.service.ExcelService;
import sn.edu.ugb.demo.service.PdfService;
import sn.edu.ugb.demo.service.ProduitService;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/produits")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ProduitController {

    private final ProduitService produitService;
    private final ProduitRepository produitRepository;
    private final PdfService pdfService;
    private final ExcelService excelService;
    private final AuditService auditService;

    private String getCurrentUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @GetMapping
    public Page<Produit> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        Pageable pageable = PageRequest.of(page, size);

        String username = getCurrentUsername();
        auditService.log(username, "VIEW", "Produit");

        return produitService.getAll(pageable);
    }

    @GetMapping("/all")
    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }

    @GetMapping("/{id}")
    public Produit getProduit(@PathVariable Long id) {
        String username = getCurrentUsername();
        auditService.log(username, "VIEW", "Produit");

        return produitService.getProduitById(id);
    }

    @GetMapping("/search")
    public List<Produit> searchProduits(@RequestParam String nom) {
        String username = getCurrentUsername();
        auditService.log(username, "SEARCH", "Produit");

        return produitService.searchByName(nom);
    }

    @PostMapping
    public Produit addProduit(@Valid @RequestBody Produit produit) {
        Produit savedProduit = produitService.saveProduit(produit);

        String username = getCurrentUsername();
        auditService.log(username, "CREATE", "Produit");

        return savedProduit;
    }

    @PutMapping("/{id}")
    public Produit updateProduit(@PathVariable Long id, @RequestBody Produit produit) {
        Produit updatedProduit = produitService.updateProduit(id, produit);
        String username = getCurrentUsername();
        auditService.log(username, "UPDATE", "Produit");

        return updatedProduit;
    }

    @GetMapping("/export/pdf")
    public ResponseEntity<InputStreamResource> exportStockPdf(){

        List<Produit> produits = produitRepository.findAll();

        ByteArrayInputStream pdf = pdfService.generateStockPdf(produits);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition","inline; filename=stock.pdf");

        String username = getCurrentUsername();
        auditService.log(username, "EXPORT_PDF", "Produit");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(pdf));
    }

    @GetMapping("/export/excel")
    public ResponseEntity<InputStreamResource> exportExcel() throws IOException {

        ByteArrayInputStream excel = excelService.exportExcel();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition","attachment; filename=produits.xlsx");

        String username = getCurrentUsername();
        auditService.log(username, "EXPORT_EXCEL", "Produit");

        return ResponseEntity.ok()
                .headers(headers)
                .body(new InputStreamResource(excel));
    }

    @DeleteMapping("/{id}")
    public void deleteProduit(@PathVariable Long id) {
        produitService.deleteProduit(id);

        String username = getCurrentUsername();
        auditService.log(username, "DELETE", "Produit");
    }
}