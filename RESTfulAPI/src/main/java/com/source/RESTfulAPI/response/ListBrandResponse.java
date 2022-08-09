package com.source.RESTfulAPI.response;

import com.source.RESTfulAPI.model.Brand;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ListBrandResponse {
    private List<Brand> brands;
    private Integer totalPage;

    public ListBrandResponse(List<Brand> brands){
        this.brands = brands;
        this.totalPage = brands.size()%10==0 ? brands.size()/10 : brands.size()/10+1;
    }
}
