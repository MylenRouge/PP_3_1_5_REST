package ru.mylenrouge.PP_3_1_5_REST.restapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.mylenrouge.PP_3_1_5_REST.restapp.models.Role;

import java.util.List;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    @Override
    List<Role> findAll();
}