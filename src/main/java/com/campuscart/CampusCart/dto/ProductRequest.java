package com.campuscart.CampusCart.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductRequest {

    private String title;
    private String description;
    private Double price;
    private String category;
    private String imageUrl;
    private String condition;
    private Boolean sold;
    private String sellerEmail;

}