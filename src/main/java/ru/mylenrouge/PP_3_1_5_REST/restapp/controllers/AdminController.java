package ru.mylenrouge.PP_3_1_5_REST.restapp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.mylenrouge.PP_3_1_5_REST.restapp.models.User;
import ru.mylenrouge.PP_3_1_5_REST.restapp.services.RoleService;
import ru.mylenrouge.PP_3_1_5_REST.restapp.services.UserService;

import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {


    private final UserService userService;

    private final RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping
    public String showAllUser(Model model, Principal principal) {
        model.addAttribute("users", userService.findAll());
        model.addAttribute("myUser", userService.findByUsername(principal.getName()));
        model.addAttribute("newUser", new User());
        model.addAttribute("listRoles", roleService.findAll());
        return "admin-panel";
    }

    @PostMapping
    public String saveUser(@ModelAttribute("newUser") User user) {
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @PatchMapping("/edit")
    public String updateUser(@ModelAttribute("user") User user) {
        userService.updateUser(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }
}