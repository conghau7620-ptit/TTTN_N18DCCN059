package com.source.RESTfulAPI.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {
    private Integer id;
    private Date createdDate;
    private String customerName;
    private String orderPhone;
    private String orderAddress;
    private String status;
    private Integer staffId;
    private String staffName;
    private String note;
    private Integer total;
}
