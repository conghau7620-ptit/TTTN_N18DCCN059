package com.source.RESTfulAPI.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackResponse {
    private String customerName;
    private Date createdDate;
    private String detail;
    private Integer vote;
}
