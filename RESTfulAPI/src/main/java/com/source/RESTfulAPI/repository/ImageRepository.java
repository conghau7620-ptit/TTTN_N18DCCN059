package com.source.RESTfulAPI.repository;

import com.source.RESTfulAPI.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {
    Image findByUserId(Integer userId);

    List<Image> findByProductId(Integer id);

    List<Image> findByFeedbackId(Integer id);
}
