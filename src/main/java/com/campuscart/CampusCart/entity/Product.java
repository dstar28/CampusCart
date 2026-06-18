package com.campuscart.CampusCart.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column
    private String description;

    @Column
    private Double price;

    @Column
    private String category;

    @Column
    private String imageUrl;

    @Column
    private String condition;

    @Column(nullable = false)
    private String sellerEmail;

    @Column
    private Boolean sold = false;

    @Column
    private LocalDateTime createdAt;

    public Product() {}

    public Product(String title, String description, Double price, String category, String condition, String sellerEmail) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.category = category;
        this.condition = condition;
        this.sellerEmail = sellerEmail;
        this.createdAt = LocalDateTime.now();
    }
}

