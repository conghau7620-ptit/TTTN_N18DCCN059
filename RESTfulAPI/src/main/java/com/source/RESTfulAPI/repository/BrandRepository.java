package com.source.RESTfulAPI.repository;

import com.source.RESTfulAPI.model.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Integer> {
    List<Brand> findByActive(boolean b);
}
