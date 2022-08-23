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
    private String productName;
    private String productImage;
    private Integer quantity;
    private Integer productDiscount;
    private Integer amount;
}
