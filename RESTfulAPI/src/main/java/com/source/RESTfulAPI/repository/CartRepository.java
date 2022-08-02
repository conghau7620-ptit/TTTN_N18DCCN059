package com.source.RESTfulAPI.repository;

import com.source.RESTfulAPI.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
    List<Cart> findByCustomerId(Integer customerId);

    boolean existsByCustomerIdAndProductId(Integer customerId, Integer productId);
}
