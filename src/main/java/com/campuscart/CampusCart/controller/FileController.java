package com.campuscart.CampusCart.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin("*")
public class FileController {

    @PostMapping
    public ResponseEntity<String> uploadFile(
            @RequestParam("file") MultipartFile file)
            throws IOException {

        String uploadDir = "uploads/";

        File directory = new File(uploadDir);

        if (!directory.exists()) {
            directory.mkdirs();
        }

        String fileName = System.currentTimeMillis()
                + "_" + file.getOriginalFilename();

        File destination =
                new File(uploadDir + fileName);

        file.transferTo(destination);

        return ResponseEntity.ok(
                "http://localhost:8080/uploads/" + fileName
        );
    }
}