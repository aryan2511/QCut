package com.colorcut.hairstylist.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Document(collection = "barbers")
public class Barber {

    @Id
    private String barberId;
    private String barberName;
    private String barberPhone;
    private int barberChairNo;
    private String status; // "available" or "busy"
    private String currentCustomerId;
}
