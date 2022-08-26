package com.source.RESTfulAPI.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailsResponse {
    private Integer id;
    private String productName;
    private String productImage;
    private Integer quantity;
    private Integer productDiscount;
    private Integer amount;
    private Boolean isFeedback;
}
