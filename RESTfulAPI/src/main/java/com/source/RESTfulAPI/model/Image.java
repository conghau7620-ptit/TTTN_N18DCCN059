package com.source.RESTfulAPI.model;

import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "Image")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String url;
    private String typeImage;
    private int relationId;

    public Image(String url, String typeImage, Integer relationId) {
        this.url = url;
        this.typeImage = typeImage;
        this.relationId = relationId;

    }
}
