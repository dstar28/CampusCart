package com.campuscart.CampusCart.repository;

import com.campuscart.CampusCart.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findBySellerEmail(String sellerEmail);
}