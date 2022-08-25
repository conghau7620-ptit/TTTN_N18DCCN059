package com.source.RESTfulAPI.controller;

import com.source.RESTfulAPI.exception.ApiRequestException;
import com.source.RESTfulAPI.model.*;
import com.source.RESTfulAPI.repository.*;
import com.source.RESTfulAPI.response.FeedbackResponse;
import com.source.RESTfulAPI.response.ListFeedbackResponse;
import com.source.RESTfulAPI.upload.FileUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public ResponseEntity<Feedback> createFeedback(@RequestParam(value = "files", required = false) List<MultipartFile> files,
                                                   @RequestParam Map<String, String> feedbackParam) throws IOException {
        Integer orderDetailsId = Integer.parseInt(feedbackParam.get("orderDetailsId"));
        String detail = feedbackParam.get("detail");

        Feedback feedback = new Feedback();
        feedback.setOrderDetailsId(orderDetailsId);
        feedback.setDetail(detail);
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

        //add image
        List<String> imageUrls = new ArrayList<>();
        for (MultipartFile file : files){
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            String uploadDir = "Images/Feedback/" + feedback.getId();
            FileUploadUtil.saveFile(uploadDir, fileName, file);

            Image image = new Image();
            image.setFeedbackId(feedback.getId());
            image.setUrl("http://localhost:8080/api/image/feedback?feedbackId=" + feedback.getId() + "&name="+ fileName);
            imageRepository.save(image);

            imageUrls.add(image.getUrl());
        }

        return ResponseEntity.ok(feedback);
    }

    public ListFeedbackResponse addImageToListFeedBack(List<Feedback> feedbacks){
        List<FeedbackResponse> data = new ArrayList<>();
        for (Feedback fb : feedbacks){
            List<Image> images = imageRepository.findByFeedbackId(fb.getId());
            List<String> imageUrls = new ArrayList<>();
            if (images!=null){
                for (Image img : images){
                    imageUrls.add(img.getUrl());
                }
            }
            OrderDetails orderDetail = orderDetailsRepository.getById(fb.getOrderDetailsId());
            Orders order = orderRepository.getById(orderDetail.getOrderId());
            Users user = userRepository.getById(order.getCustomerId());

            data.add(new FeedbackResponse(
                    user.getName(),
                    fb.getCreatedDate(),
                    fb.getDetail(),
                    imageUrls
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
        ListFeedbackResponse data = addImageToListFeedBack(feedbacks);
        return ResponseEntity.ok(data);
    }
}
