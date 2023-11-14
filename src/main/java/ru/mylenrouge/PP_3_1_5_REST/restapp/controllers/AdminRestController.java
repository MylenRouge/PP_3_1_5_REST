package ru.mylenrouge.PP_3_1_5_REST.restapp.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mylenrouge.PP_3_1_5_REST.restapp.models.User;
import ru.mylenrouge.PP_3_1_5_REST.restapp.services.UserService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AdminRestController {

    private final UserService userService;

    public AdminRestController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/admin")
    public List<User> showAllUsers() {
        return userService.findAll();
    }

    @GetMapping("/admin/{id}")
    public ResponseEntity<User> showUser(@PathVariable Long id) {
        User user = userService.findById(id);
        return user != null ? new ResponseEntity<>(user, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/admin")
    public User newUser(@RequestBody User user) {
        userService.saveUser(user);
        return user;
    }

    @PutMapping("/admin")
    public User editUser(@RequestBody User user) {
        userService.updateUser(user);
        return user;
    }

    @DeleteMapping("/admin/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "User with ID = " + id + "deleted";
    }
}
