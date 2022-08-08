package com.source.RESTfulAPI.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletContext;
import java.nio.file.Files;
import java.nio.file.Paths;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/image")
public class ImageController {

    @Autowired
    private ServletContext context;

    @GetMapping("/user")
    public byte[] getUserImage(@RequestParam Integer userId, @RequestParam String name) throws Exception{

        return Files.readAllBytes(Paths.get("Images/User/"+userId + "/" + name));
    }
}
