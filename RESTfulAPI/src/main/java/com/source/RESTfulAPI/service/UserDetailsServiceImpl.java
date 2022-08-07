package com.source.RESTfulAPI.service;

import com.source.RESTfulAPI.exception.ApiRequestException;
import com.source.RESTfulAPI.model.Role;
import com.source.RESTfulAPI.model.Users;
import com.source.RESTfulAPI.repository.RoleRepository;
import com.source.RESTfulAPI.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) {
        Users user = userRepository.findByUsername(username);
        if (user==null) {
            throw new ApiRequestException("Username không tồn tại");
        }
        Role role = roleRepository.getById(user.getRoleId());

        return UserDetailsImpl.build(user, role);
    }

}
