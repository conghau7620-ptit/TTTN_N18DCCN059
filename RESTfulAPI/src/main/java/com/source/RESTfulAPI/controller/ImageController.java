package com.source.RESTfulAPI.controller;

import com.source.RESTfulAPI.upload.FileUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.activation.FileTypeMap;
import javax.servlet.ServletContext;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/image")
public class ImageController {

    @Autowired
    private ServletContext context;

    @GetMapping("/user")
    public byte[] getUserImage(@RequestParam Integer userId, @RequestParam String name) throws Exception {

        return Files.readAllBytes(Paths.get("Images/User/" + userId + "/" + name));
    }

    @PutMapping("/user")
    public ResponseEntity<String> updateUserImage(@RequestParam("file") MultipartFile file,
                                                  @RequestParam Integer userId, @RequestParam String name) throws IOException {
        String uploadDir = "Images/User/" + userId;
        FileUploadUtil.saveFile(uploadDir, name, file);

        return ResponseEntity.ok("localhost:8080/api/image/user?userId=" + userId + "&name="+ name);
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

        return ResponseEntity.ok("localhost:8080/api/image/product?productId=" + productId + "&name="+ name);
    }

    @GetMapping("/feedback")
    public byte[] getFeedbackImage(@RequestParam Integer feedbackId, @RequestParam String name) throws Exception {

        return Files.readAllBytes(Paths.get("Images/Feedback/" + feedbackId + "/" + name));
    }
}
