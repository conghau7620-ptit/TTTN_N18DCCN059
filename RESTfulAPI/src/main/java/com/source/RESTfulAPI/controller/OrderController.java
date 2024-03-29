package com.source.RESTfulAPI.controller;

import com.source.RESTfulAPI.exception.ApiRequestException;
import com.source.RESTfulAPI.model.*;
import com.source.RESTfulAPI.repository.*;
import com.source.RESTfulAPI.response.OrderDetailsResponse;
import com.source.RESTfulAPI.response.OrderResponse;
import com.source.RESTfulAPI.validation.Validation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderDetailsRepository orderDetailsRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired FeedbackRepository feedbackRepository;

    public Integer getAmount(OrderDetails orderDetail){
        Product product = productRepository.getById(orderDetail.getProductId());
        Integer discount = product.getDiscount() == 0 ? 100 : product.getDiscount();

        return product.getPrice() * orderDetail.getQuantity() * discount/100;
    }

    public String getStatus(Integer status){
        switch (status){
            case 1:{
                return "đang xử lý";
            }
            case 2:{
                return "đang giao";
            }
            case 3:{
                return "đã hoàn thành";
            }
            default:{
                return "đã hủy";
            }
        }
    }

    public Integer getTotal(Orders order){
        List<OrderDetails> orderDetails = orderDetailsRepository.findByOrderId(order.getId());
        Integer total =0;
        for (OrderDetails details : orderDetails){
            total += details.getAmount();
        }
        return total;
    }

    public OrderResponse getOrderResponse(Orders order){
        Users customer = userRepository.getById(order.getCustomerId());
        Users staff = order.getStaffId()==null ? null : userRepository.getById(order.getStaffId());

        List<OrderDetails> orderDetails = orderDetailsRepository.findByOrderId(order.getId());
        List<OrderDetailsResponse> orderDetailsResponses = new ArrayList<>();
        for (OrderDetails details : orderDetails){
            orderDetailsResponses.add(getOrderDetailsResponse(details));
        }

        return new OrderResponse(
                order.getId(),
                order.getCreatedDate(),
                customer.getName(),
                order.getOrderPhone(),
                order.getOrderAddress(),
                getStatus(order.getStatus()),
                staff == null ? null : staff.getId(),
                staff == null ? null : staff.getName(),
                order.getNote(),
                order.getTotal(),
                orderDetailsResponses
        );
    }

    public OrderDetailsResponse getOrderDetailsResponse(OrderDetails orderDetail){
        Product product = productRepository.getById(orderDetail.getProductId());
        Image productImage = imageRepository.findByProductId(product.getId()).get(0);
        Orders order = orderRepository.getById(orderDetail.getOrderId());


        Boolean isFeedback = false;
        if (feedbackRepository.getByOrderDetailsId(orderDetail.getId())!=null){
            isFeedback = true;
        }

        return new OrderDetailsResponse(
                orderDetail.getId(),
                product.getName(),
                productImage.getUrl(),
                orderDetail.getQuantity(),
                product.getDiscount(),
                orderDetail.getAmount(),
                isFeedback
        );
    }


    @GetMapping
    public ResponseEntity<List<OrderResponse>> getAllOrder() {
        List<OrderResponse> orderResponses = new ArrayList<>();
        List<Orders> orders = orderRepository.findAll();
        for (Orders o : orders) {
            orderResponses.add(getOrderResponse(o));
        }
        Collections.reverse(orderResponses);
        return ResponseEntity.ok(orderResponses);
    }

    @GetMapping("{id}")
    public ResponseEntity<OrderResponse> getOrderById(@PathVariable Integer id) {
        Orders order = orderRepository.findById(id).orElse(null);
        if (order == null) throw new ApiRequestException("Id đơn hàng không tồn tại");
        return ResponseEntity.ok(getOrderResponse(order));
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<OrderResponse>> getOrderByCustomerId(@PathVariable Integer customerId) {
        List<OrderResponse> orderResponses = new ArrayList<>();
        List<Orders> orders = orderRepository.findByCustomerId(customerId);
        for (Orders o : orders) {
            orderResponses.add(getOrderResponse(o));
        }
        Collections.reverse(orderResponses);
        return ResponseEntity.ok(orderResponses);
    }

    public void checkValidField(ParamOrder paramOrder) {
        Orders orders = paramOrder.getOrders();
        List<OrderDetails> orderDetails = paramOrder.getOrderDetails();

        if (orders.getCustomerId() == null) {
            throw new ApiRequestException("Id khách hàng không được để trống");
        }

        if (orders.getOrderPhone() == null || orders.getOrderPhone().isEmpty()) {
            throw new ApiRequestException("Số điện thoại giao hàng không được để trống");
        }

        if (orders.getOrderAddress() == null || orders.getOrderAddress().isEmpty()) {
            throw new ApiRequestException("Địa chỉ giao hàng không được để trống");
        }

        if (!Validation.isValidPhoneNumber(orders.getOrderPhone())) {
            throw new ApiRequestException("Số điện thoại không hợp lệ");
        }

        for (OrderDetails i : orderDetails) {
            if (i.getProductId() == null) {
                throw new ApiRequestException("Id sản phẩm không được để trống");
            }

            Product product = productRepository.findById(i.getProductId()).orElse(null);
            if (product == null) throw new ApiRequestException("Id sản phẩm không tồn tại");
            if (!product.getActive()) {
                throw new ApiRequestException("Sản phẩm " + product.getName() + " đang ngừng kinh doanh");
            }

        }

    }

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestBody ParamOrder paramOrder) {
        Orders order = paramOrder.getOrders();
        List<OrderDetails> orderDetails = paramOrder.getOrderDetails();

        order.setCreatedDate(new Date());
        order.setStatus(1);

        checkValidField(paramOrder);
        for (OrderDetails i : orderDetails) {
            if (i.getQuantity() == null || i.getQuantity() <= 0) {
                throw new ApiRequestException("Số lượng sản phẩm phải lớn hơn 0");
            }
        }

        order.setTotal(0);

        orderRepository.save(order);
        orderRepository.flush();
        for (OrderDetails details : orderDetails) {
            details.setOrderId(order.getId());
            details.setAmount(getAmount(details));
            orderDetailsRepository.save(details);
        }

        order.setTotal(getTotal(order));
        orderRepository.save(order);
        orderRepository.flush();

        return ResponseEntity.ok(getOrderResponse(order));
    }

    @PutMapping
    public ResponseEntity<OrderResponse> updateOrder(@RequestBody ParamOrder paramOrder) {
        Orders order = paramOrder.getOrders();
        List<OrderDetails> orderDetails = paramOrder.getOrderDetails();

        checkValidField(paramOrder);
        Orders orderTmp = orderRepository.findById(order.getId()).orElse(null);
        if (orderTmp == null) {
            throw new ApiRequestException("Id giỏ hàng không tồn tại");
        }

        if (orderTmp.getStatus() != 1) {
            throw new ApiRequestException("Đơn hàng không thể chỉnh sửa vì đã được shop xác nhận");
        }

        int count = 0;
        for (OrderDetails i : orderDetails) {
            if (orderDetailsRepository.findById(i.getId()).orElse(null) == null) {
                throw new ApiRequestException("Id chi tiết giỏ hàng không tồn tại");
            }
            if (i.getQuantity() == 0) {
                orderDetailsRepository.delete(i);
                count++;
            }
        }
        if (count == orderDetails.size()) {
            orderRepository.delete(order);
            return ResponseEntity.ok(null);
        }

        List<OrderDetails> newOrderDetails = new ArrayList<>();
        for (OrderDetails i : orderDetails) {
            if (i.getQuantity() != 0) {
                orderDetailsRepository.save(i);
                newOrderDetails.add(i);
            }
        }

        order.setTotal(getTotal(order));
        orderRepository.save(order);
        orderRepository.flush();

        return ResponseEntity.ok(getOrderResponse(order));
    }

    @PutMapping("/customer/cancel/{id}")
    public ResponseEntity<Orders> cancelOrderByCustomer(@PathVariable Integer id) {
        Orders order = orderRepository.findById(id).orElse(null);
        if (order == null) {
            throw new ApiRequestException("Id không tồn tại");
        }

        if (order.getStatus() == 2 || order.getStatus() == 3) {
            throw new ApiRequestException("Đơn hàng không thể hủy vì đã được shop xác nhận");
        }

        order.setStatus(4);
        orderRepository.save(order);
        return ResponseEntity.ok(order);
    }

    @PutMapping("/staff/status")
    public ResponseEntity<Orders> changeStatus(@RequestBody Map<String, String> param) {
        Integer id = Integer.parseInt(param.get("id"));
        Integer status = Integer.parseInt(param.get("status"));
        Integer staffId = Integer.parseInt(param.get("staffId"));

        Orders order = orderRepository.findById(id).orElse(null);
        if (order == null) {
            throw new ApiRequestException("Id không tồn tại");
        }

        order.setStatus(status);
        order.setStaffId(staffId);
        orderRepository.save(order);
        return ResponseEntity.ok(order);
    }
}
