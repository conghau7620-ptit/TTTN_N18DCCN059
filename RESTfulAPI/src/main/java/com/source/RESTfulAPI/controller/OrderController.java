package com.source.RESTfulAPI.controller;

import com.source.RESTfulAPI.exception.ApiRequestException;
import com.source.RESTfulAPI.model.OrderDetails;
import com.source.RESTfulAPI.model.Orders;
import com.source.RESTfulAPI.model.ParamOrder;
import com.source.RESTfulAPI.model.Product;
import com.source.RESTfulAPI.repository.OrderDetailsRepository;
import com.source.RESTfulAPI.repository.OrderRepository;
import com.source.RESTfulAPI.repository.ProductRepository;
import com.source.RESTfulAPI.validation.Validation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    @Autowired
    private ProductRepository productRepository;


    @GetMapping
    public ResponseEntity<List<ParamOrder>> getAllOrder() {
        List<ParamOrder> paramOrders = new ArrayList<>();
        List<Orders> orders = orderRepository.findAll();
        for (Orders o : orders) {
            List<OrderDetails> orderDetails = orderDetailsRepository.findByOrderId(o.getId());
            paramOrders.add(new ParamOrder(o, orderDetails));
        }
        return ResponseEntity.ok(paramOrders);
    }

    @GetMapping("{id}")
    public ResponseEntity<ParamOrder> getOrderById(@PathVariable Integer id) {
        Orders order = orderRepository.findById(id).orElse(null);
        if (order == null) throw new ApiRequestException("Id đơn hàng không tồn tại");
        List<OrderDetails> orderDetails = orderDetailsRepository.findByOrderId(id);
        return ResponseEntity.ok(new ParamOrder(order, orderDetails));
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<ParamOrder>> getOrderByCustomerId(@PathVariable Integer customerId) {
        List<ParamOrder> paramOrders = new ArrayList<>();
        List<Orders> orders = orderRepository.findByCustomerId(customerId);
        for (Orders o : orders) {
            List<OrderDetails> orderDetails = orderDetailsRepository.findByOrderId(o.getId());
            paramOrders.add(new ParamOrder(o, orderDetails));
        }
        return ResponseEntity.ok(paramOrders);
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
    public ResponseEntity<ParamOrder> createOrder(@RequestBody ParamOrder paramOrder) {
        Orders orders = paramOrder.getOrders();
        List<OrderDetails> orderDetails = paramOrder.getOrderDetails();

        orders.setCreatedDate(new Date());
        orders.setStatus(1);

        checkValidField(paramOrder);
        for (OrderDetails i : orderDetails) {
            if (i.getQuantity() == null || i.getQuantity() <= 0) {
                throw new ApiRequestException("Số lượng sản phẩm phải lớn hơn 0");
            }
        }

        orderRepository.save(orders);
        for (OrderDetails i : orderDetails) {
            i.setOrderId(orders.getId());
            orderDetailsRepository.save(i);
        }

        paramOrder.setOrders(orders);
        paramOrder.setOrderDetails(orderDetails);
        return ResponseEntity.ok(paramOrder);
    }

    @PutMapping
    public ResponseEntity<ParamOrder> updateOrder(@RequestBody ParamOrder paramOrder) {
        Orders orders = paramOrder.getOrders();
        List<OrderDetails> orderDetails = paramOrder.getOrderDetails();

        checkValidField(paramOrder);
        Orders orderTmp = orderRepository.findById(orders.getId()).orElse(null);
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
            orderRepository.delete(orders);
            return ResponseEntity.ok(null);
        }

        List<OrderDetails> newOrderDetails = new ArrayList<>();
        orderRepository.save(orders);
        for (OrderDetails i : orderDetails) {
            if (i.getQuantity() != 0) {
                orderDetailsRepository.save(i);
                newOrderDetails.add(i);
            }
        }

        paramOrder.setOrders(orders);
        paramOrder.setOrderDetails(newOrderDetails);
        return ResponseEntity.ok(paramOrder);
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
