package com.source.RESTfulAPI.response;

import com.source.RESTfulAPI.model.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {
    private Integer id;
    private String name;
    private String description;
    private Integer price;
    private Integer quantity;
    private String type;
    private String brand;
    private Integer discount;
    private Boolean active;
    private List<String> imageUrls;

    public ProductResponse (Product product, List<String> imageUrls, String typeName, String brandName){
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.quantity = product.getQuantity();
        this.type = typeName;
        this.brand = brandName;
        this.discount = product.getDiscount();
        this.active = product.getActive();
        this.imageUrls = imageUrls;
    }
}
