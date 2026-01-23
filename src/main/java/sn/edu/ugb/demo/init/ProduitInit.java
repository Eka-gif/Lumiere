package sn.edu.ugb.demo.init;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import sn.edu.ugb.demo.entity.Produit;
import sn.edu.ugb.demo.repository.ProduitRepository;

@Component
@Profile({"test"})
public class ProduitInit implements CommandLineRunner {

    private final ProduitRepository produitRepository;

    public ProduitInit(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Initialisation de la liste des produits");
        Produit p1 = Produit.builder()
                .nom("souris")
                .prix(5000.0)
                .quantite(25)
                .build();
        produitRepository.save(p1);

        produitRepository.save(
                Produit.builder()
                        .nom("clavier")
                        .prix(10000.0)
                        .quantite(30)
                        .build()

        );



    }


}
