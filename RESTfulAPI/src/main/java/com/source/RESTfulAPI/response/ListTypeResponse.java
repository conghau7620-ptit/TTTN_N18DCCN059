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

    public ListTypeResponse (List<Type> types) {
        this.types = types;
        this.totalPage = types.size()%10==0 ? types.size()/10 : types.size()/10+1;
    }
}
