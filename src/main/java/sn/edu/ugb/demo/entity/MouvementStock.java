package sn.edu.ugb.demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@Entity
public class MouvementStock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type; // ENTREE ou SORTIE
    private int quantite;

    private LocalDateTime date;

    @ManyToOne
    private Produit produit;
}