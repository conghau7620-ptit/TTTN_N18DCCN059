package com.source.RESTfulAPI.controller;

import com.source.RESTfulAPI.exception.ApiRequestException;
import com.source.RESTfulAPI.model.Users;
import com.source.RESTfulAPI.repository.ImageRepository;
import com.source.RESTfulAPI.repository.RoleRepository;
import com.source.RESTfulAPI.repository.UserRepository;
import com.source.RESTfulAPI.validation.Validation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private RoleRepository roleRepository;
//    @Autowired
//    private PasswordEncoder passwordEncoder;

    public List<Users> getListUserByPage(List<Users> users, Integer page){

        int start = 10 * (page - 1);
        int end = (10 * page) > users.size() ? users.size(): 10 * page;
        List<Users> data = new ArrayList<>();
        for (int i = start; i < end; i++) {
            data.add(users.get(i));
        }

        return data;
    }

    @GetMapping
    @ResponseBody
    public ResponseEntity<List<Users>> getAllUser(@RequestParam Integer page) {
        List<Users> users = userRepository.findAll();
        List<Users> data = getListUserByPage(users, page);
        return ResponseEntity.ok(data);
    }

    @GetMapping("{id}")
    @ResponseBody
    public ResponseEntity<Users> getUserByUsername(@PathVariable Integer id) {
        Users user = userRepository.findById(id).orElse(null);
        if (user == null) throw new ApiRequestException("Id user không tồn tại");
        return ResponseEntity.ok(user);
    }

    @GetMapping("/customer")
    public ResponseEntity<List<Users>> getAllCustomer(@RequestParam Integer page){
        List<Users> users = userRepository.findByRoleId(3);
        List<Users> data = getListUserByPage(users, page);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/staff")
    public ResponseEntity<List<Users>> getAllStaffAdmin(@RequestParam Integer page){
        List<Users> users = userRepository.findAll();
        List<Users> staff = new ArrayList<>();
        for (Users u : users){
            if (u.getRoleId()!=3) staff.add(u);
        }
        List<Users> data = getListUserByPage(staff, page);
        return ResponseEntity.ok(staff);
    }


    public ResponseEntity checkValidField(Users user){
        if (user.getUsername()==null || user.getUsername().isEmpty()){
            throw new ApiRequestException("Username không được để trống");
        }

        if (user.getPassword()==null || user.getPassword().isEmpty()){
            throw new ApiRequestException("Password không được để trống");
        }

        if (user.getName()==null || user.getName().isEmpty()){
            throw new ApiRequestException("Tên không được để trống");
        }

        if (user.getPhone()==null || user.getPhone().isEmpty()){
            throw new ApiRequestException("Số điện thoại không được để trống");
        }

        if (user.getRoleId()==null){
            throw new ApiRequestException("Chức danh không được để trống");
        }

        if (user.getActive()==null){
            throw new ApiRequestException("Trạng thái hoạt động không được để trống");
        }

        if (userRepository.existsByUsername(user.getUsername())) {
            throw new ApiRequestException("Username đã tồn tại");
        }

        if (!Validation.isValidUsername(user.getUsername())) {
            throw new ApiRequestException("Username không hợp lệ");
        }

        if (!Validation.isValidPhoneNumber(user.getPhone())) {
            throw new ApiRequestException("Số điện thoại không hợp lệ");
        }
        return null;
    }

    @PostMapping
    public ResponseEntity<Users> createUser(@RequestBody Users user) {

        user.setCreatedDate(new Date());
        user.setActive(true);

        checkValidField(user);

//        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);

        return ResponseEntity.ok(user);
    }

    @PutMapping
    public ResponseEntity<Users> updateUser(@RequestBody Users user) {

        if (userRepository.findById(user.getId()).orElse(null)==null)
            throw new ApiRequestException("Id không tồn tại");

        checkValidField(user);

//        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Integer id) {
        Users user = userRepository.findById(id).orElse(null);
        if (user == null) throw new ApiRequestException("Id không tồn tại");

        userRepository.delete(user);

        return ResponseEntity.ok( "Xóa thành công");
    }
}

