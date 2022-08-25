package com.source.RESTfulAPI.response;

import com.source.RESTfulAPI.model.Users;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private Integer id;
    private String username;
    private String password;
    private String name;
    private String address;
    private String email;
    private String phone;
    private Date createdDate;
    private Integer roleId;
    private Boolean active;
    private String imageUrl;

    public UserResponse (Users user, String imageUrl){
        this.id = user.getId();
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.name = user.getName();
        this.address = user.getAddress();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.createdDate = user.getCreatedDate();
        this.roleId = user.getRoleId();
        this.active = user.getActive();
        this.imageUrl = imageUrl;
    }
}
