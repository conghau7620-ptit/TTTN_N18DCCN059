package com.source.RESTfulAPI.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
public class ParamOrder {
    private Orders orders;
    private List<OrderDetails> orderDetails;
}
