package com.utilitybox.app.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.Instant;

@Entity
@Table(name = "applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationEntity extends BaseEntity implements Serializable {
    @Column
    private String name;

    @Column
    private String description;

    @Column(name = "create_date")
    private Instant createDate;
}
