package com.source.RESTfulAPI.controller;

import com.source.RESTfulAPI.model.ResponseData;
import com.source.RESTfulAPI.model.Users;
import com.source.RESTfulAPI.repository.ImageRepository;
import com.source.RESTfulAPI.repository.UserRepository;
import com.source.RESTfulAPI.validation.Validation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin("*")
@RestController
@RequestMapping("api")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    private ImageRepository imageRepository;

    @GetMapping("/user")
    @ResponseBody
    public ResponseData getAllUser(){
        return new ResponseData(200,"Thành công", Collections.singletonList(userRepository.findAll()));
    }

    @GetMapping("/user/{id}")
    @ResponseBody
    public ResponseData getUserByUsername(@PathVariable Integer id){
        Users user = userRepository.findById(id).orElse(null);
        if (user!=null) {
            List<Object> data = new ArrayList<>();
            data.add(user);
            return new ResponseData(200,"Thành công", data);
        }
        return new ResponseData(400,"Id không tồn tại", null);
    }

    @PostMapping("/user")
    public ResponseData createUser(@RequestBody Users user){
        user.setCreatedDate(new Date());

        if (userRepository.existsByUsername(user.getUsername())) {
            return new ResponseData(400,"Username đã tồn tại", null);
        }

        if (!Validation.isValidUsername(user.getUsername())){
            return new ResponseData(400, "Username không hợp lệ", null);
        }

        if (!Validation.isValidPhoneNumber(user.getPhone())) {
            return new ResponseData(400, "Số điện thoại không hợp lệ", null);
        }

        userRepository.save(user);
        return new ResponseData(200,"Thêm thành công", null);
    }

//    @PutMapping("/user")
//    public ResponseEntity<Users> updateUser(@RequestBody Users user){
//        Users userTmp = userRepository.findById(user.getId())
//                .orElseThrow(() -> new ResourceNotFoundException("Không tồn tại user với id: " + user.getId()));
//        userTmp.setPassword(user.getPassword());
//        userTmp.setName(user.getName());
//        userTmp.setAddress(user.getAddress());
//        userTmp.setEmail(user.getEmail());
//        userTmp.setPhone(user.getPhone());
//        userTmp.setImage();
//    }
}
