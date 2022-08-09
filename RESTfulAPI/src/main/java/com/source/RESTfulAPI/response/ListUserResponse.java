package com.source.RESTfulAPI.response;

import com.source.RESTfulAPI.model.Users;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ListUserResponse {
    private List<UserResponse> userResponses;
    private Integer totalPage;

}
