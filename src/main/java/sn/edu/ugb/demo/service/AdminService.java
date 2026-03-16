package sn.edu.ugb.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.edu.ugb.demo.repository.ProduitRepository;
import sn.edu.ugb.demo.repository.CategorieRepository;
import sn.edu.ugb.demo.repository.UserRepository;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminService {

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private CategorieRepository categorieRepository;

    @Autowired
    private UserRepository userRepository;


    public Map<String, Long> getStats() {

        Map<String, Long> stats = new HashMap<>();

        stats.put("produits", produitRepository.count());
        stats.put("categories", categorieRepository.count());
        stats.put("utilisateurs", userRepository.count());
        stats.put("rupture", produitRepository.countByQuantiteLessThanEqual(5));

        return stats;
    }


    public Map<String, Long> getProductsByCategory() {

        List<Object[]> results = produitRepository.countProductsByCategory();

        Map<String, Long> data = new HashMap<>();

        for (Object[] row : results) {
            String categorie = (String) row[0];
            Long count = (Long) row[1];
            data.put(categorie, count);
        }

        return data;
    }
}