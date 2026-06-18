package com.campuscart.CampusCart.Service;

import com.campuscart.CampusCart.dto.ProductRequest;
import com.campuscart.CampusCart.entity.Product;
import com.campuscart.CampusCart.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product addProduct(ProductRequest request) {

        Product product = new Product();

        product.setTitle(request.getTitle());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setCategory(request.getCategory());
        product.setImageUrl(request.getImageUrl());
        product.setCondition(request.getCondition());
        product.setSellerEmail(request.getSellerEmail());
        product.setCreatedAt(LocalDateTime.now());

        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {

        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public void deleteProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        productRepository.delete(product);
    }

    public List<Product> getProductsBySeller(String sellerEmail) {
        return productRepository.findBySellerEmail(sellerEmail);
    }

    public Product updateProduct(Long id, ProductRequest request) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setTitle(request.getTitle());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setCategory(request.getCategory());
        product.setImageUrl(request.getImageUrl());
        product.setCondition(request.getCondition());
        product.setSellerEmail(request.getSellerEmail());

        return productRepository.save(product);
    }

    public Product markAsSold(Long id){

        Product product =
                productRepository
                        .findById(id)
                        .orElseThrow();

        product.setSold(true);

        return productRepository.save(product);
    }
}