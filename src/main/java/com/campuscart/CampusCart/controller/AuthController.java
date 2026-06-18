package com.campuscart.CampusCart.controller;

import com.campuscart.CampusCart.dto.LoginRequest;
import com.campuscart.CampusCart.dto.RegisterRequest;
import com.campuscart.CampusCart.entity.User;
import com.campuscart.CampusCart.Service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {
        return userService.registerUser(request);
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginRequest request) {
        return userService.loginUser(request);
    }

    @GetMapping("/phone/{email}")
    public String getPhoneNumber(
            @PathVariable String email){

        return userService.getPhoneNumber(email);
    }
}