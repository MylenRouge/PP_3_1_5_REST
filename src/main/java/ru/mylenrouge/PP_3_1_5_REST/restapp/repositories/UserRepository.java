package ru.mylenrouge.PP_3_1_5_REST.restapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.mylenrouge.PP_3_1_5_REST.restapp.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);
}