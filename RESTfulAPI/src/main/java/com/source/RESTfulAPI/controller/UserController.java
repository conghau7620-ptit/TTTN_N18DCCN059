package com.source.RESTfulAPI.controller;

import com.source.RESTfulAPI.exception.ApiRequestException;
import com.source.RESTfulAPI.model.Image;
import com.source.RESTfulAPI.model.Users;
import com.source.RESTfulAPI.repository.ImageRepository;
import com.source.RESTfulAPI.repository.RoleRepository;
import com.source.RESTfulAPI.repository.UserRepository;
import com.source.RESTfulAPI.response.ListUserResponse;
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

@CrossOrigin("*")
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
    private ServletContext context;

//    public ListUserResponse getListUserByPage(List<Users> users, Integer page){
//
//        int start = 10 * (page - 1);
//        int end = (10 * page) > users.size() ? users.size(): 10 * page;
//        List<UserResponse> data = new ArrayList<>();
//        for (int i = start; i < end; i++) {
//            Image image = imageRepository.findByUserId(users.get(i).getId());
//            data.add(new UserResponse(users.get(i),image==null?null:image.getUrl()));
//        }
//
//        return new ListUserResponse(data, users.size()%10==0 ? users.size()/10 : users.size()/10+1);
//    }

    public ListUserResponse addImageToListUser(List<Users> users){
        List<UserResponse> data = new ArrayList<>();
        for (Users u : users){
            Image image = imageRepository.findByUserId(u.getId());
            data.add(new UserResponse(u, image==null ? null : image.getUrl()));
        }
        return new ListUserResponse(data, users.size()%10==0 ? users.size()/10 : users.size()/10+1);
    }

    @GetMapping
    @ResponseBody
    public ResponseEntity<ListUserResponse> getAllUser() {
        List<Users> users = userRepository.findAll();
        ListUserResponse data = addImageToListUser(users);
        return ResponseEntity.ok(data);
    }

    @GetMapping("{id}")
    @ResponseBody
    public ResponseEntity<UserResponse> getUserByUsername(@PathVariable Integer id) {
        Users user = userRepository.findById(id).orElse(null);
        if (user == null) throw new ApiRequestException("Id user không tồn tại");

        Image userImage = imageRepository.findByUserId(user.getId());

        UserResponse userResponse = new UserResponse(user, userImage==null?null: userImage.getUrl());

        return ResponseEntity.ok(userResponse);
    }

    @GetMapping("/customer")
    public ResponseEntity<ListUserResponse> getAllCustomer(){
        List<Users> users = userRepository.findByRoleId(3);
        ListUserResponse data = addImageToListUser(users);
        return ResponseEntity.ok(data);
    }

    @GetMapping("/staff")
    public ResponseEntity<ListUserResponse> getAllStaffAdmin(){
        List<Users> users = userRepository.findAll();
        List<Users> staffs = new ArrayList<>();
        for (Users u : users){
            if (u.getRoleId()!=3) staffs.add(u);
        }
        ListUserResponse data = addImageToListUser(staffs);
        return ResponseEntity.ok(data);
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
    public ResponseEntity<Users> updateUser(@RequestBody Users user) throws ParseException {

        if (userRepository.findById(user.getId()).orElse(null)==null)
            throw new ApiRequestException("Id không tồn tại");

        checkValidField(user);

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

