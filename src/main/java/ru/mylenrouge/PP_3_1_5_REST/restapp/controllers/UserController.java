package ru.mylenrouge.PP_3_1_5_REST.restapp.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.mylenrouge.PP_3_1_5_REST.restapp.models.User;
import ru.mylenrouge.PP_3_1_5_REST.restapp.services.UserService;

import java.security.Principal;

@Controller
@RequestMapping("/user")
public class UserController {
    private final UserService userService;


    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public String showUser(Model model, Principal principal) {
        User user = userService.findByUsername(principal.getName());
        model.addAttribute("myUser", user);
        return "user-page";
    }
}