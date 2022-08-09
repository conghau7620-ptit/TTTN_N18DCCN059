package com.source.RESTfulAPI.controller;

import com.source.RESTfulAPI.exception.ApiRequestException;
import com.source.RESTfulAPI.model.Brand;
import com.source.RESTfulAPI.model.Type;
import com.source.RESTfulAPI.repository.ProductRepository;
import com.source.RESTfulAPI.repository.TypeRepository;
import com.source.RESTfulAPI.response.ListTypeResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/type")
public class TypeController {

    @Autowired
    private TypeRepository typeRepository;

    @Autowired
    private ProductRepository productRepository;

    public ListTypeResponse getListTypeByPage(List<Type> types, Integer page){

        int start = 10 * (page - 1);
        int end = (10 * page) > types.size() ? types.size(): 10 * page;
        List<Type> data = new ArrayList<>();
        for (int i = start; i < end; i++) {
            data.add(types.get(i));
        }

        return new ListTypeResponse(data, types.size()%10==0 ? types.size()/10 : types.size()/10+1);
    }

    @GetMapping
    public ResponseEntity<ListTypeResponse> getAllType(@RequestParam Integer page) {
        List<Type> types = typeRepository.findAll();
        ListTypeResponse data = getListTypeByPage(types, page);
        return ResponseEntity.ok(data);
    }

    @GetMapping("/active")
    public ResponseEntity<ListTypeResponse> getActiveType(@RequestParam Integer page) {
        List<Type> types = typeRepository.findByActive(true);
        ListTypeResponse data = getListTypeByPage(types, page);
        return ResponseEntity.ok(data);
    }

    @GetMapping("{id}")
    public ResponseEntity<Type> getTypeById(@PathVariable Integer id) {
        Type type = typeRepository.findById(id).orElse(null);
        if (type == null) throw new ApiRequestException("Id loại sản phẩm không tồn tại");
        return ResponseEntity.ok(type);
    }

    @PostMapping
    public ResponseEntity<Type> createType(@RequestBody Type type) {
        if (type.getName() == null || type.getName().isEmpty()) {
            throw new ApiRequestException("Tên loại sản phẩm không được để trống");
        }

        type.setActive(true);

        typeRepository.save(type);
        return ResponseEntity.ok(type);
    }

    @PutMapping
    public ResponseEntity<Type> updateType(@RequestBody Type type) {

        Type typeTmp = typeRepository.findById(type.getId()).orElse(null);
        if (typeTmp == null) throw new ApiRequestException("Id loại sản phẩm không tồn tại");

        if (type.getName() == null || type.getName().isEmpty()) {
            throw new ApiRequestException("Tên loại sản phẩm không được để trống");
        }

        typeRepository.save(type);
        return ResponseEntity.ok(type);
    }

    @PutMapping("/active")
    public ResponseEntity<Type> changeActiveType(@RequestBody Map<String, String> param){
        Integer id = Integer.parseInt(param.get("id"));
        Boolean active = Boolean.parseBoolean(param.get("active"));

        Type type = typeRepository.findById(id).orElse(null);
        if (type==null) throw new ApiRequestException("Id không tồn tại");
        type.setActive(active);

        typeRepository.save(type);
        return ResponseEntity.ok(type);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteType(@PathVariable Integer id) {
        Type type = typeRepository.findById(id).orElse(null);
        if (type == null) throw new ApiRequestException("Id loại sản phẩm không tồn tại");

        typeRepository.delete(type);

        return ResponseEntity.ok("Xóa thành công");
    }
}
