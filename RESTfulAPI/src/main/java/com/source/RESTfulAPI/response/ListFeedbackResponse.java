package com.source.RESTfulAPI.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ListFeedbackResponse {
    private List<FeedbackResponse> feedbackResponses;
    private Integer totalPage;
}
