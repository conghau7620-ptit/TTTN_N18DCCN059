package com.source.RESTfulAPI.controller;

import com.source.RESTfulAPI.exception.ApiRequestException;
import com.source.RESTfulAPI.model.Brand;
import com.source.RESTfulAPI.model.Image;
import com.source.RESTfulAPI.model.Product;
import com.source.RESTfulAPI.model.Type;
import com.source.RESTfulAPI.repository.BrandRepository;
import com.source.RESTfulAPI.repository.ImageRepository;
import com.source.RESTfulAPI.repository.ProductRepository;
import com.source.RESTfulAPI.repository.TypeRepository;
import com.source.RESTfulAPI.response.ListProductResponse;
import com.source.RESTfulAPI.response.ProductResponse;
import com.source.RESTfulAPI.upload.FileUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @Autowired
    private ImageRepository imageRepository;

    public ListProductResponse addImageToListProduct(List<Product> products){

        List<ProductResponse> data = new ArrayList<>();
        for (Product p : products) {
            List<Image> images = imageRepository.findByProductId(p.getId());
            List<String> imageUrls = new ArrayList<>();
            if (images!=null) {
                for (Image i : images) {
                    imageUrls.add(i.getUrl());
                }
            }

            String typeName = typeRepository.getById(p.getTypeId()).getName();
            String brandName = brandRepository.getById(p.getBrandId()).getName();
            data.add(new ProductResponse(p, imageUrls, typeName, brandName));
        }

        return new ListProductResponse(data, data.size()%10==0 ? data.size()/10 : data.size()/10+1);
    }

    @GetMapping
    public ResponseEntity<ListProductResponse> getAllProduct() {
        List<Product> products = productRepository.findAll();
        ListProductResponse data = addImageToListProduct(products);
        return ResponseEntity.ok(data);
    }

    @GetMapping("{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Integer id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product == null) throw new ApiRequestException("Id không tồn tại");

        List<Image> images = imageRepository.findByProductId(product.getId());
        List<String> imageUrls = new ArrayList<>();
        if (images!=null) {
            for (Image i : images) {
                imageUrls.add(i.getUrl());
            }
        }

        String typeName = typeRepository.getById(product.getTypeId()).getName();
        String brandName = brandRepository.getById(product.getBrandId()).getName();

        return ResponseEntity.ok(new ProductResponse(product, imageUrls, typeName, brandName));
    }

    @GetMapping("/brand")
    public ResponseEntity<ListProductResponse> getProductByBrandId(@RequestParam Integer brandId) {

        List<Product> products = productRepository.findByBrandId(brandId);
        ListProductResponse data = addImageToListProduct(products);
        return ResponseEntity.ok(data);
    }

    @GetMapping("/type")
    public ResponseEntity<ListProductResponse> getProductByTypeId(@RequestParam Integer typeId){

        List<Product> products = productRepository.findByTypeId(typeId);
        ListProductResponse data = addImageToListProduct(products);
        return ResponseEntity.ok(data);
    }

    @GetMapping("/active")
    public ResponseEntity<ListProductResponse> getActiveProduct() {
        List<Product> products = productRepository.findByActive(true);
        List<Product> activeList = new ArrayList<>();
        for (Product p : products){
            Brand brand = brandRepository.getById(p.getBrandId());
            Type type = typeRepository.getById(p.getTypeId());
            if (brand.getActive() && type.getActive()){
                activeList.add(p);
            }
        }

        ListProductResponse data = addImageToListProduct(activeList);

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
    public ResponseEntity<ProductResponse> createProduct(@RequestParam(value = "files", required = false) List<MultipartFile> files,
                                                 @RequestParam Map<String, String> productParam) throws IOException {
        Product product = new Product();
        product.setName(productParam.get("name"));
        product.setDescription(productParam.get("Description"));
        product.setPrice(Integer.parseInt(productParam.get("price")));
        product.setQuantity(Integer.parseInt(productParam.get("quantity")));
        product.setTypeId(Integer.parseInt(productParam.get("typeId")));
        product.setBrandId(Integer.parseInt(productParam.get("brandId")));
        product.setDiscount(Integer.parseInt(productParam.get("discount")));
        product.setActive(true);
        checkValidField(product);
        productRepository.save(product);
        productRepository.flush();

        //add image
        List<String> imageUrls = new ArrayList<>();
        for (MultipartFile file : files){
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            String uploadDir = "Images/Product/" + product.getId();
            FileUploadUtil.saveFile(uploadDir, fileName, file);

            Image image = new Image();
            image.setProductId(product.getId());
            image.setUrl("localhost:8080/api/image/product?productId=" + product.getId() + "&name="+ fileName);
            imageRepository.save(image);

            imageUrls.add(image.getUrl());
        }

        String brandName = brandRepository.getById(product.getBrandId()).getName();
        String typeName = typeRepository.getById(product.getTypeId()).getName();

        return ResponseEntity.ok(new ProductResponse(product, imageUrls, typeName, brandName));
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
