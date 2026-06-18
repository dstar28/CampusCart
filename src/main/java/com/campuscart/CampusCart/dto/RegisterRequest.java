package com.campuscart.CampusCart.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    private String fullName;
    private String phoneNumber;
    private String email;
    private String password;
    private String college;

}