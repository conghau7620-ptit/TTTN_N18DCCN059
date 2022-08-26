package com.source.RESTfulAPI.controller;

import com.source.RESTfulAPI.model.Image;
import com.source.RESTfulAPI.repository.ImageRepository;
import com.source.RESTfulAPI.upload.FileUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/image")
public class ImageController {

    @Autowired
    private ImageRepository imageRepository;

    @GetMapping("/user")
    public byte[] getUserImage(@RequestParam Integer userId, @RequestParam String name) throws Exception {

        return Files.readAllBytes(Paths.get("Images/User/" + userId + "/" + name));
    }

    @PutMapping("/user")
    public ResponseEntity<String> updateUserImage(@RequestParam("file") MultipartFile file,
                                                  @RequestParam Integer userId, @RequestParam String name) throws IOException {
        String uploadDir = "Images/User/" + userId;
        FileUploadUtil.saveFile(uploadDir, name, file);
        String url = "http://localhost:8080/api/image/user?userId=" + userId + "&name="+ name;
        Image image = imageRepository.findByUserId(userId);
        image.setUrl(url);
        imageRepository.save(image);

        return ResponseEntity.ok(url);
    }

    @GetMapping("/product")
    public byte[] getProductImage(@RequestParam Integer productId, @RequestParam String name) throws Exception {

        return Files.readAllBytes(Paths.get("Images/Product/" + productId + "/" + name));
    }

    @PutMapping("/product")
    public ResponseEntity<String> updateProductImage(@RequestParam("file") MultipartFile file,
                                                  @RequestParam Integer productId, @RequestParam String name) throws IOException {
        String uploadDir = "Images/Product/" + productId;
        FileUploadUtil.saveFile(uploadDir, name, file);

        return ResponseEntity.ok("http://localhost:8080/api/image/product?productId=" + productId + "&name="+ name);
    }
}
