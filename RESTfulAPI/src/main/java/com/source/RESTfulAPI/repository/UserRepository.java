package com.source.RESTfulAPI.repository;

import com.source.RESTfulAPI.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {
    Users findByUsername(String username);

    Users findByUsernameAndPassword(String username, String password);

    boolean existsByUsername(String username);

    List<Users> findByRoleId(int roleId);
}
