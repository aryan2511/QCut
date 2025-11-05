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

@Document(collection = "queue_entries")
public class QueueEntry {

    @Id
    private String id;
    private String customerName;
    private String serviceType;
    private QueueStatus status;
    private String barberId;
    private java.time.LocalDateTime joinedAt;
    private int position;
}
