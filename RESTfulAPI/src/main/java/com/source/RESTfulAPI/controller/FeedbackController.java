package com.source.RESTfulAPI.controller;

import com.source.RESTfulAPI.exception.ApiRequestException;
import com.source.RESTfulAPI.model.*;
import com.source.RESTfulAPI.repository.*;
import com.source.RESTfulAPI.response.FeedbackResponse;
import com.source.RESTfulAPI.response.ListFeedbackResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderDetailsRepository orderDetailsRepository;
    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<Feedback> createFeedback(@RequestParam Map<String, String> feedbackParam) throws IOException {
        Integer orderDetailsId = Integer.parseInt(feedbackParam.get("orderDetailsId"));
        String detail = feedbackParam.get("detail");
        Integer vote = Integer.parseInt(feedbackParam.get("vote"));

        Feedback feedback = new Feedback();
        feedback.setOrderDetailsId(orderDetailsId);
        feedback.setDetail(detail);
        feedback.setVote(vote);

        feedback.setCreatedDate(new Date());

        OrderDetails orderDetail = orderDetailsRepository.getById(orderDetailsId);
        if (orderDetail==null) {
            throw new ApiRequestException("Id chi tiết đơn hàng không tồn tại");
        }

        Orders order = orderRepository.getById(orderDetail.getOrderId());
        if (order.getStatus()!=3) {
            throw new ApiRequestException("Chỉ được đánh giá khi đơn hàng đã hoàn thành");
        }

        if (feedback.getDetail().isEmpty() || feedback.getDetail()==null) {
            throw new ApiRequestException("Nội dung đánh giá không được để trống");
        }

        if (feedbackRepository.getByOrderDetailsId(orderDetailsId)!=null){
            throw new ApiRequestException("Chi tiết đơn hàng đã được đánh giá từ trước");
        }

        feedbackRepository.save(feedback);
        feedbackRepository.flush();

        return ResponseEntity.ok(feedback);
    }

    public ListFeedbackResponse createListFeedback(List<Feedback> feedbacks){
        List<FeedbackResponse> data = new ArrayList<>();
        for (Feedback fb : feedbacks){
            OrderDetails orderDetail = orderDetailsRepository.getById(fb.getOrderDetailsId());
            Orders order = orderRepository.getById(orderDetail.getOrderId());
            Users user = userRepository.getById(order.getCustomerId());
            Image userImage = imageRepository.findByUserId(user.getId());

            data.add(new FeedbackResponse(
                    user.getName(),
                    userImage.getUrl(),
                    fb.getCreatedDate(),
                    fb.getDetail(),
                    fb.getVote()
            ));
        }
        Collections.reverse(data);
        return new ListFeedbackResponse(data, data.size()%10==0 ? data.size()/10 : data.size()/10+1);
    }

    @GetMapping("{productId}")
    public ResponseEntity<ListFeedbackResponse> getFeedbackByProductId(@PathVariable Integer productId){
        List<OrderDetails> orderDetails = orderDetailsRepository.getByProductId(productId);
        List<Feedback> feedbacks = new ArrayList<>();
        for (OrderDetails detail : orderDetails) {
            Feedback feedback = feedbackRepository.getByOrderDetailsId(detail.getId());
            if (feedback!=null) {
                feedbacks.add(feedback);
            }
        }
        ListFeedbackResponse data = createListFeedback(feedbacks);
        return ResponseEntity.ok(data);
    }
}
