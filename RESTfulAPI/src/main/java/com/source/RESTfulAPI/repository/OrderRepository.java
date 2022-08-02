package com.source.RESTfulAPI.repository;

import com.source.RESTfulAPI.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Integer> {
    List<Orders> findByCustomerId(Integer customerId);
}
