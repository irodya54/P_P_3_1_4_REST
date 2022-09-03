package ru.kata.spring.boot_security.demo.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RolesService;
import ru.kata.spring.boot_security.demo.service.UserService;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;

    private final RolesService rolesService;

    public AdminController(UserService userService, RolesService rolesService) {
        this.userService = userService;
        this.rolesService = rolesService;
    }

    @GetMapping("")
    public String getAllUsers(Model model) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        model.addAttribute("user", user);
        model.addAttribute("allUsers", userService.getAllUsers());
        model.addAttribute("allRoles", rolesService.getAllRoles());
        return "admin/show-users";
    }

    @GetMapping("/addUser")
    public String addUser(Model model) {
        model.addAttribute("user", new User());
        model.addAttribute("allRoles", rolesService.getAllRoles());
        return "admin/add-user";
    }

    @PostMapping("/addUser")
    public String saveUser(@ModelAttribute("user") User user,
                           @RequestParam("roles") String[] roles) {
            userService.addUser(user, roles);
         return "redirect:/admin";
    }

    @GetMapping("/edit/{id}")
    public String returnUser(@PathVariable("id") int id, Model model) {
        model.addAttribute("user", userService.getUserById(id));
        model.addAttribute("allRoles", rolesService.getAllRoles());
        return "admin/edit-user";
    }
    @PostMapping("edit/{id}")
    public String update(@ModelAttribute("user") User user,
                         @RequestParam("roles") String[] roles,
                         @PathVariable("id") int id) {
        userService.updateUser(user, roles);
        return "redirect:/admin";
    }

    @GetMapping("/{id}")
    public String deleteUser(@PathVariable("id") int id, Model model) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }
}
