package com.source.RESTfulAPI.model;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String description;
    private int price;
    private int quantity;
    private int rated;

    @ManyToOne
    @JoinColumn(name = "Type")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Type type;

    @ManyToOne
    @JoinColumn(name = "Brand")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Brand brand;

    private int discount;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private List<Image> images;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private List<Cart> carts;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private List<OrderDetails> orderDetails;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private List<Feedback> feedbacks;
}