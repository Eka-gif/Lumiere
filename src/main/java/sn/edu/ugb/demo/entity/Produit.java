package sn.edu.ugb.demo.entity;


import jakarta.persistence.*;
import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;
@Getter
@Setter
@Entity
@Table(name = "produits")
public class Produit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String nom;

    @NotNull
    @Positive
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal prix;


    @NotNull
    @Min(0)
    @Column(nullable = false)
    private Integer quantite;

    @Column
    private String description;


    @ManyToOne(fetch = FetchType.EAGER)

    @JoinColumn(name = "categorie_id")
    private Categorie categorie;
    

    
}

