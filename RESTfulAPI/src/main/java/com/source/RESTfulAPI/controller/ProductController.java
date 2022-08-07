package com.source.RESTfulAPI.controller;

import com.source.RESTfulAPI.exception.ApiRequestException;
import com.source.RESTfulAPI.model.Brand;
import com.source.RESTfulAPI.model.Product;
import com.source.RESTfulAPI.model.Type;
import com.source.RESTfulAPI.repository.BrandRepository;
import com.source.RESTfulAPI.repository.ProductRepository;
import com.source.RESTfulAPI.repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private TypeRepository typeRepository;

    public List<Product> getListProductByPage(List<Product> products, Integer page){

        int start = 10 * (page - 1);
        int end = (10 * page) > products.size() ? products.size(): 10 * page;
        List<Product> data = new ArrayList<>();
        for (int i = start; i < end; i++) {
            data.add(products.get(i));
        }

        return data;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProduct() {
        List<Product> products = productRepository.findAll();
//        List<Product> data = getListProductByPage(products, page);
        return ResponseEntity.ok(products);
    }

    @GetMapping("{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product == null) throw new ApiRequestException("Id không tồn tại");
        return ResponseEntity.ok(product);
    }

    @GetMapping("/brand")
    public ResponseEntity<List<Product>> getProductByBrandId(@RequestParam Map<String, String> param) {
        Integer brandId = Integer.parseInt(param.get("brandId"));
        Integer page = Integer.parseInt(param.get("page"));

        List<Product> products = productRepository.findByBrandId(brandId);
        List<Product> data = getListProductByPage(products, page);
        return ResponseEntity.ok(data);
    }

    @GetMapping("/type")
    public ResponseEntity<List<Product>> getProductByTypeId(@RequestParam Map<String, String> param){
        Integer typeId = Integer.parseInt(param.get("typeId"));
        Integer page = Integer.parseInt(param.get("page"));

        List<Product> products = productRepository.findByTypeId(typeId);
        List<Product> data = getListProductByPage(products, page);
        return ResponseEntity.ok(data);
    }

    @GetMapping("/active")
    public ResponseEntity<List<Product>> getActiveProduct(@RequestParam Integer page) {
        List<Product> products = productRepository.findByActive(true);
        List<Product> activeList = new ArrayList<>();
        for (Product p : products){
            Brand brand = brandRepository.getById(p.getBrandId());
            Type type = typeRepository.getById(p.getTypeId());
            if (brand.getActive() && type.getActive()){
                activeList.add(p);
            }
        }

        List<Product> data = getListProductByPage(activeList, page);

        return ResponseEntity.ok(data);
    }

    public void checkValidField(Product product) {
        if (product.getName() == null || product.getName().isEmpty()) {
            throw new ApiRequestException("Tên sản phẩm không được để trống");
        }

        if (product.getPrice() == null) {
            throw new ApiRequestException("Giá sản phẩm không được để trống");
        }

        if (product.getQuantity() == null) {
            throw new ApiRequestException("Số lượng sản phẩm không được để trống");
        }

        if (product.getTypeId() == null) {
            throw new ApiRequestException("Loại sản phẩm không được để trống");
        }

        if (product.getBrandId() == null) {
            throw new ApiRequestException("Thương hiệu sản phẩm không được để trống");
        }
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {

        checkValidField(product);

        product.setActive(true);

        productRepository.save(product);
        return ResponseEntity.ok(product);
    }

    @PutMapping
    public ResponseEntity<Product> updateProduct(@RequestBody Product product) {
        Product productTmp = productRepository.findById(product.getId()).orElse(null);
        if (productTmp == null) throw new ApiRequestException("Id không tồn tại");

        checkValidField(product);

        productRepository.save(product);
        return ResponseEntity.ok(product);
    }

    @PutMapping("/active")
    public ResponseEntity<Product> changeActive(@RequestBody Map<String, String> param){
        Integer id = Integer.parseInt(param.get("id"));
        Boolean active = Boolean.parseBoolean(param.get("active"));

        Product product = productRepository.findById(id).orElse(null);
        if (product == null) throw new ApiRequestException("Id không tồn tại");
        product.setActive(active);
        productRepository.save(product);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Integer id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product == null) throw new ApiRequestException("Id không tồn tại");

        productRepository.delete(product);

        return ResponseEntity.ok("Xóa thành công");
    }
}
