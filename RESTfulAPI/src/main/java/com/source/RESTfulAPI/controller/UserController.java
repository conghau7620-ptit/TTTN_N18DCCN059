package com.source.RESTfulAPI.controller;

import com.source.RESTfulAPI.exception.ApiRequestException;
import com.source.RESTfulAPI.model.Image;
import com.source.RESTfulAPI.model.Users;
import com.source.RESTfulAPI.repository.ImageRepository;
import com.source.RESTfulAPI.repository.RoleRepository;
import com.source.RESTfulAPI.repository.UserRepository;
import com.source.RESTfulAPI.response.UserResponse;
import com.source.RESTfulAPI.upload.FileUploadUtil;
import com.source.RESTfulAPI.validation.Validation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.transaction.Transactional;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    ServletContext context;

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
    public ResponseEntity<UserResponse> getUserByUsername(@PathVariable Integer id) {
        Users user = userRepository.findById(id).orElse(null);
        if (user == null) throw new ApiRequestException("Id user không tồn tại");

        Image userImage = imageRepository.getByUserId(user.getId());

        UserResponse userResponse = new UserResponse(user, userImage.getUrl());

        return ResponseEntity.ok(userResponse);
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
            throw new ApiRequestException("Vai trò không được để trống");
        }

        if (user.getActive()==null){
            throw new ApiRequestException("Trạng thái hoạt động không được để trống");
        }

        if (!Validation.isValidUsername(user.getUsername())) {
            throw new ApiRequestException("Username không hợp lệ");
        }

        if (!Validation.isValidPhoneNumber(user.getPhone())) {
            throw new ApiRequestException("Số điện thoại không hợp lệ");
        }
        return null;
    }

    @Transactional
    @PostMapping
    public ResponseEntity<Users> createUser(@RequestParam("file") MultipartFile file,
                                            @RequestParam Map<String, String> userParam) throws IOException {
        Users user = new Users();

        user.setUsername(userParam.get("username"));
        user.setPassword(userParam.get("password"));
        user.setName(userParam.get("name"));
        user.setAddress(userParam.get("address"));
        user.setEmail(userParam.get("email"));
        user.setPhone(userParam.get("phone"));
        user.setRoleId(Integer.parseInt(userParam.get("roleId")));
        user.setCreatedDate(new Date());
        user.setActive(true);

        checkValidField(user);
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new ApiRequestException("Username đã tồn tại");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);
        userRepository.flush();

        //add image
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String uploadDir = "Images/User/" + user.getId();
        FileUploadUtil.saveFile(uploadDir, fileName, file);

        Image image = new Image();
        image.setUserId(user.getId());
        image.setUrl("localhost:8080/api/image/user?userId=" + user.getId() + "&name="+ fileName);
        imageRepository.save(image);

        return ResponseEntity.ok(user);
    }

    @PutMapping
    public ResponseEntity<Users> updateUser(@RequestParam(value = "file", required = false) MultipartFile file,
                                            @RequestParam Map<String, String> userParam) throws ParseException {

        Users user = new Users();
        user.setId(Integer.parseInt(userParam.get("id")));
        user.setUsername(userParam.get("username"));
        user.setPassword(userParam.get("password"));
        user.setName(userParam.get("name"));
        user.setAddress(userParam.get("address"));
        user.setEmail(userParam.get("email"));
        user.setPhone(userParam.get("phone"));
        user.setCreatedDate(new SimpleDateFormat("dd/MM/yyyy").parse(userParam.get("createdDate")));
        user.setRoleId(Integer.parseInt(userParam.get("roleId")));
        user.setActive(Boolean.parseBoolean(userParam.get("active")));

        if (userRepository.findById(user.getId()).orElse(null)==null)
            throw new ApiRequestException("Id không tồn tại");

        checkValidField(user);

        user.setPassword(passwordEncoder.encode(user.getPassword()));

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

