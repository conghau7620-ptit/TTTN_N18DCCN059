package com.source.RESTfulAPI.repository;

import com.source.RESTfulAPI.model.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TypeRepository extends JpaRepository<Type, Integer> {
    List<Type> findByActive(boolean b);
}
