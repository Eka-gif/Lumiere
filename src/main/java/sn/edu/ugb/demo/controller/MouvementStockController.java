package sn.edu.ugb.demo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import sn.edu.ugb.demo.entity.MouvementStock;
import sn.edu.ugb.demo.service.MouvementStockService;

import java.util.List;

@RestController
@RequestMapping("/api/stock")
@RequiredArgsConstructor
public class MouvementStockController {

    private final MouvementStockService mouvementService;

    @GetMapping
    public List<MouvementStock> getAll() {
        return mouvementService.getAll();
    }

    @PostMapping
    public MouvementStock ajouter(
            @RequestBody MouvementStock mouvement) {
        return mouvementService.ajouterMouvement(mouvement);
    }
}