package com.source.RESTfulAPI.model;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String username;
    private String password;
    private String name;
    private String address;
    private String email;
    private String phone;

    @OneToOne
    @JoinColumn(name = "AvatarId")
    private Image image;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date createdDate;

    @ManyToOne
    @JoinColumn(name = "Role")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Role role;

    private Boolean status;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private List<Cart> carts;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private List<Order> customerOrders;

    @OneToMany(mappedBy = "staff", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private List<Order> staffOrders;
}
