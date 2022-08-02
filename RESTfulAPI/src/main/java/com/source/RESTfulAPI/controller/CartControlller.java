package com.source.RESTfulAPI.controller;

import com.source.RESTfulAPI.exception.ApiRequestException;
import com.source.RESTfulAPI.model.Cart;
import com.source.RESTfulAPI.repository.CartRepository;
import com.source.RESTfulAPI.repository.ProductRepository;
import com.source.RESTfulAPI.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartControlller {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<Cart> getListCartByPage(List<Cart> carts, Integer page){

        int start = 10 * (page - 1);
        int end = (10 * page) > carts.size() ? carts.size(): 10 * page;
        List<Cart> data = new ArrayList<>();
        for (int i = start; i < end; i++) {
            data.add(carts.get(i));
        }

        return data;
    }

    @GetMapping
    public ResponseEntity<List<Cart>> getAllCart(@RequestParam Integer page){
        List<Cart> carts = cartRepository.findAll();
        List<Cart> data = getListCartByPage(carts, page);
        return ResponseEntity.ok(data);
    }

    @GetMapping("/customer")
    public ResponseEntity<List<Cart>> getCartByUser(@RequestParam Map<String, String> param){
        Integer customerId = Integer.parseInt(param.get("customerId"));
        Integer page = Integer.parseInt(param.get("page"));

        List<Cart> carts = cartRepository.findByCustomerId(customerId);
        List<Cart> data = getListCartByPage(carts, page);
        return ResponseEntity.ok(data);
    }

    public void checkEmptyField(Cart cart){
        if (cart.getCustomerId()==null){
            throw new ApiRequestException("Id sản phẩm không được để trống");
        }

        if (cart.getProductId()==null) {
            throw new ApiRequestException("Id sản phẩm không được để trống");
        }

        if (cart.getQuantity()==null) {
            throw new ApiRequestException("Số lượng không được để trống");
        }


        if (userRepository.findById(cart.getCustomerId()).orElse(null)==null){
            throw new ApiRequestException("Id khách hàng không tồn tại");
        }

        if (productRepository.findById(cart.getProductId()).orElse(null)==null){
            throw new ApiRequestException("Id sản phẩm không tồn tại");
        }

    }

    @PostMapping
    public ResponseEntity<Cart> createCart (@RequestBody Cart cart){

        checkEmptyField(cart);

        if (cartRepository.existsByCustomerIdAndProductId(cart.getCustomerId(),cart.getProductId())){
            throw new ApiRequestException("Giỏ hàng đã tồn tại");
        }

        cartRepository.save(cart);
        return ResponseEntity.ok(cart);
    }

    @PutMapping
    public ResponseEntity<Cart> updateCart(@RequestBody Cart cart){
        if (cartRepository.findById(cart.getId()).orElse(null)==null) {
            throw new ApiRequestException("Id giỏ hàng không tồn tại");
        }

        checkEmptyField(cart);

        if (cart.getQuantity()==0) {
            deleteCart(cart.getId());
            return null;
        }

        cartRepository.save(cart);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCart(@PathVariable Integer id){
        Cart cart = cartRepository.findById(id).orElse(null);
        if (cart==null) {
            throw new ApiRequestException("Id giỏ hàng không tồn tại");
        }

        cartRepository.delete(cart);
        return ResponseEntity.ok("Xóa thành công");
    }
}
