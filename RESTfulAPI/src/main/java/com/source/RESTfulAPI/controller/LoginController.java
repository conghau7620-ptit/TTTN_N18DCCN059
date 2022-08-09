package com.source.RESTfulAPI.controller;

import com.source.RESTfulAPI.exception.ApiRequestException;
import com.source.RESTfulAPI.jwt.JwtResponse;
import com.source.RESTfulAPI.jwt.JwtUtils;
import com.source.RESTfulAPI.model.Users;
import com.source.RESTfulAPI.repository.RoleRepository;
import com.source.RESTfulAPI.repository.UserRepository;
import com.source.RESTfulAPI.service.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody Map<String, String> param) {
        String username = param.get("username");
        String password = param.get("password");

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        String role = roles.get(0);

        Users user = userRepository.findByUsername(username);

        if (!user.getActive()) throw new ApiRequestException("Tài khoản đã bị khóa");

        JwtResponse jwtResponse = new JwtResponse();
        jwtResponse.setToken(jwt);
        jwtResponse.setId(user.getId());
        jwtResponse.setUsername(username);
        jwtResponse.setRole(role);

        return ResponseEntity.ok(jwtResponse);
    }
}
