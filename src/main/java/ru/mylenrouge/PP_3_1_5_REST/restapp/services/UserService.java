package ru.mylenrouge.PP_3_1_5_REST.restapp.services;

import ru.mylenrouge.PP_3_1_5_REST.restapp.models.User;

import java.util.List;

public interface UserService {

    List<User> findAll();

    User findById(Long id);

    User findByUsername(String username);

    void saveUser(User user);

    void deleteUser(Long id);

    void updateUser(User user);
}