package com.source.RESTfulAPI.response;

import com.source.RESTfulAPI.model.Type;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ListTypeResponse {
    private List<Type> types;
    private Integer totalPage;
}
