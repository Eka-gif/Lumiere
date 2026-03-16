package sn.edu.ugb.demo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import sn.edu.ugb.demo.entity.User;
import sn.edu.ugb.demo.repository.UserRepository;
import sn.edu.ugb.demo.service.AuditService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private AuditService auditService;
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        auditService.log(currentUsername,"AJOUT","UTILISATEUR");
        return userRepository.save(user);

    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        String currentUsername = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User currentUser = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new RuntimeException("Utilisateur connecté introuvable"));


        if(user.getId().equals(currentUser.getId())){
            return ResponseEntity.badRequest()
                    .body("Vous ne pouvez pas modifier votre propre compte");
        }


        if(user.getRole().equals("ROLE_ADMIN")){
            return ResponseEntity.badRequest()
                    .body("Impossible de modifier un administrateur");
        }

        user.setUsername(updatedUser.getUsername());
        user.setRole(updatedUser.getRole());

        userRepository.save(user);

        return ResponseEntity.ok("Utilisateur modifié avec succès");
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id, Authentication authentication) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        String currentUsername = authentication.getName();

        User currentUser = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new RuntimeException("Utilisateur courant introuvable"));


        if(user.getId().equals(currentUser.getId())){
            return ResponseEntity.badRequest()
                    .body("Vous ne pouvez pas supprimer votre propre compte");
        }


        if(user.getRole().equals("ROLE_ADMIN")){
            return ResponseEntity.badRequest()
                    .body("Impossible de supprimer un administrateur");
        }

        userRepository.delete(user);


        auditService.log(currentUsername,"SUPPRESSION","UTILISATEUR");
        return ResponseEntity.ok("Utilisateur supprimé");

    }

    @PutMapping("/{id}/toggle-status")
    public ResponseEntity<?> toggleUserStatus(@PathVariable Long id){

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));


        if(user.getRole().equals("ROLE_ADMIN")){
            return ResponseEntity.badRequest()
                    .body(Map.of("message","Impossible de désactiver un administrateur"));
        }

        user.setEnabled(!user.isEnabled());

        userRepository.save(user);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        auditService.log(currentUsername,"MODIFICATION","UTILISATEUR");
        return ResponseEntity.ok(Map.of("message","Statut utilisateur modifié"));

    }
}