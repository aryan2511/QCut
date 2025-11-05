package com.colorcut.hairstylist.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.colorcut.hairstylist.Entity.QueueEntry;
import com.colorcut.hairstylist.Entity.QueueStatus;

import java.util.List;

@Repository
public interface QueueRepository extends MongoRepository<QueueEntry, String> {
    
    List<QueueEntry> findByStatusOrderByPositionAsc(QueueStatus status);
    
    List<QueueEntry> findByBarberId(String barberId);
    
    long countByStatus(QueueStatus status);
}
