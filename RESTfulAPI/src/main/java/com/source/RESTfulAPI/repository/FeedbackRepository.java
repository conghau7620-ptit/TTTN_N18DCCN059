package com.source.RESTfulAPI.repository;

import com.source.RESTfulAPI.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
    Feedback getByOrderDetailsId(Integer orderDetailsId);
}
