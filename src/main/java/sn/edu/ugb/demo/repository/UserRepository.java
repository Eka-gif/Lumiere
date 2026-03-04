package sn.edu.ugb.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.edu.ugb.demo.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}