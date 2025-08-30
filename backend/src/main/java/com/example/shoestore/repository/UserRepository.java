package com.example.shoestore.repository;
import com.example.shoestore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByUsername(String username);

    Optional<User> findById(Long id);
//    @Override
//    Optional<User> findByUsername(String username);// Override để tìm kiếm theo username
Optional<User> findByUsername(String username);
}
