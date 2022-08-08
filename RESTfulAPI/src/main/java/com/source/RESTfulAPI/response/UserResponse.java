package com.source.RESTfulAPI.response;

import com.source.RESTfulAPI.model.Users;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private Users user;
    private String imageUrl;
}
