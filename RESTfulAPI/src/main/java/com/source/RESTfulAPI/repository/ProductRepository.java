package com.source.RESTfulAPI.repository;

import com.source.RESTfulAPI.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByBrandId(Integer brandId);

    List<Product> findByTypeId(Integer typeId);

    List<Product> findByActive(boolean b);
}
