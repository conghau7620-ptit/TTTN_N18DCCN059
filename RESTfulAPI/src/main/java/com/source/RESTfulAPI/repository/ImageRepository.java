package com.source.RESTfulAPI.repository;

import com.source.RESTfulAPI.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {
    Image findByUserId(Integer userId);
}
