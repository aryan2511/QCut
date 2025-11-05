package com.colorcut.hairstylist.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.colorcut.hairstylist.Entity.Barber;

import java.util.List;

@Repository
public interface BarberRepository extends MongoRepository<Barber, String> {
    
    List<Barber> findByStatus(String status);
    
    Barber findByBarberChairNo(int chairNo);
}
