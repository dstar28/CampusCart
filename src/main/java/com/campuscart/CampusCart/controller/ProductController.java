package com.campuscart.CampusCart.controller;

import com.campuscart.CampusCart.dto.ProductRequest;
import com.campuscart.CampusCart.entity.Product;
import com.campuscart.CampusCart.Service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public Product addProduct(@RequestBody ProductRequest request) {
        return productService.addProduct(request);
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
       return productService.getProductById(id);
   }

    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id) {

        productService.deleteProduct(id);

        return "Product deleted successfully";
    }

    @GetMapping("/seller/{email}")
    public List<Product> getProductsBySeller(@PathVariable String email) {
        return productService.getProductsBySeller(email);
    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id,
                                 @RequestBody ProductRequest request) {

        return productService.updateProduct(id, request);
    }

    @PutMapping("/{id}/sold")
    public Product markAsSold(
            @PathVariable Long id){

        return productService.markAsSold(id);
    }


}