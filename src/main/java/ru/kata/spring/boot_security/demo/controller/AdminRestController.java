package ru.kata.spring.boot_security.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RolesService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/rest")
public class AdminRestController {

    private final UserService userService;

    private final RolesService rolesService;

    public AdminRestController(UserService userService, RolesService rolesService) {
        this.userService = userService;
        this.rolesService = rolesService;
    }

    @GetMapping("/")
    public ResponseEntity<List<User>> getAllUser () {
        final List<User> users = userService.getAllUsers();

        return users != null &&  !users.isEmpty()
                ? new ResponseEntity<>(users, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/user}")
    public ResponseEntity<User> getUser( Model model) {
        final User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return user != null
                ? new ResponseEntity<>(user, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/")
    public ResponseEntity<?> addUser(@RequestBody User newUser) {
        System.out.println(1);
        userService.addUser(newUser);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?>  deleteUser (@PathVariable("id") int id) {
        final boolean deleted = userService.deleteUser(id);
        User user = userService.getUserById(id);

        return deleted
                ? new ResponseEntity<>(user, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }

    @PutMapping("/")
    public ResponseEntity<User> editUser(@RequestBody User editUser) {
        final boolean edited = userService.updateUser(editUser);

        return edited
                ? new ResponseEntity<>(editUser, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }


}
