package com.source.RESTfulAPI.controller;

import com.source.RESTfulAPI.exception.ApiRequestException;
import com.source.RESTfulAPI.model.Brand;
import com.source.RESTfulAPI.repository.BrandRepository;
import com.source.RESTfulAPI.repository.ProductRepository;
import com.source.RESTfulAPI.response.ListBrandResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/brand")
public class BrandController {

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public ResponseEntity<ListBrandResponse> getListBrandByPageNumber() {
        List<Brand> brands = brandRepository.findAll();
        return ResponseEntity.ok(new ListBrandResponse(brands));
    }

    @GetMapping("/active")
    public ResponseEntity<ListBrandResponse> getActiveBrand() {
        List<Brand> brands = brandRepository.findByActive(true);
        return ResponseEntity.ok(new ListBrandResponse(brands));
    }

    @GetMapping("{id}")
    public ResponseEntity<Brand> getBrandById(@PathVariable Integer id) {
        Brand brand = brandRepository.findById(id).orElse(null);
        if (brand == null) throw new ApiRequestException("Id không tồn tại");
        return ResponseEntity.ok(brand);
    }

    @PostMapping
    public ResponseEntity<Brand> createBrand(@RequestBody Brand brand) {
        if (brand.getName() == null || brand.getName().isEmpty()) {
            throw new ApiRequestException("Tên thương hiệu không được để trống");
        }

        brand.setActive(true);

        brandRepository.save(brand);
        return ResponseEntity.ok(brand);
    }

    @PutMapping
    public ResponseEntity<Brand> updateBrand(@RequestBody Brand brand) {

        Brand brandTmp = brandRepository.findById(brand.getId()).orElse(null);
        if (brandTmp == null) throw new ApiRequestException("Id thương hiệu không tồn tại");

        if (brand.getName() == null || brand.getName().isEmpty()) {
            throw new ApiRequestException("Tên thương hiệu không được để trống");
        }

        brandRepository.save(brand);
        return ResponseEntity.ok(brand);
    }

    @PutMapping("/active")
    public ResponseEntity<Brand> changeActiveBrand(@RequestBody Map<String, String> param) {
        Integer id = Integer.parseInt(param.get("id"));
        Boolean active = Boolean.parseBoolean(param.get("active"));

        Brand brand = brandRepository.findById(id).orElse(null);
        if (brand == null) throw new ApiRequestException("Id không tồn tại");
        brand.setActive(active);

        brandRepository.save(brand);
        return ResponseEntity.ok(brand);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteBrand(@PathVariable Integer id) {

        Brand brand = brandRepository.findById(id).orElse(null);
        if (brand == null) throw new ApiRequestException("Id thương hiệu không tồn tại");

        brandRepository.delete(brand);
        return ResponseEntity.ok("Xóa thành công");
    }
}
