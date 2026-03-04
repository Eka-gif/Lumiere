package sn.edu.ugb.demo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sn.edu.ugb.demo.entity.Categorie;
import sn.edu.ugb.demo.repository.CategorieRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategorieService {

    private final CategorieRepository categorieRepository;

    public List<Categorie> getAll() {
        return categorieRepository.findAll();
    }

    public Categorie getById(Long id) {
        return categorieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categorie introuvable"));
    }

    public Categorie save(Categorie categorie) {
        return categorieRepository.save(categorie);
    }

    public void delete(Long id) {
        categorieRepository.deleteById(id);
    }
}