package com.source.RESTfulAPI.repository;

import com.source.RESTfulAPI.model.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Integer> {
    List<OrderDetails> findByOrderId(Integer orderId);

    List<OrderDetails> getByProductId(Integer productId);
}
