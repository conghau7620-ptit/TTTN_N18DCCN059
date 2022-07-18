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
@Table(name = "Order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date createdDate;

    @ManyToOne
    @JoinColumn(name = "User")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private User customer;

    private String orderPhone;
    private String orderAddress;
    private int status;

    @ManyToOne
    @JoinColumn(name = "User")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private User staff;

    private String note;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private List<Feedback> feedbacks;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private List<OrderDetails> orderDetails;
}
