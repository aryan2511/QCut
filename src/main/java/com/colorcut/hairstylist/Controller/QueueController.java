package com.colorcut.hairstylist.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.colorcut.hairstylist.Entity.QueueEntry;
import com.colorcut.hairstylist.Service.QueueService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/queue")
@CrossOrigin(origins = "*")
public class QueueController {

    @Autowired
    private QueueService queueService;

    @GetMapping
    public ResponseEntity<List<QueueEntry>> getAllQueueEntries() {
        return ResponseEntity.ok(queueService.getAllQueueEntries());
    }

    @GetMapping("/{id}")
    public ResponseEntity<QueueEntry> getQueueEntryById(@PathVariable String id) {
        return queueService.getQueueEntryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<QueueEntry> addToQueue(@RequestBody QueueEntry queueEntry) {
        QueueEntry createdEntry = queueService.addToQueue(queueEntry);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEntry);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeFromQueue(@PathVariable String id) {
        queueService.removeFromQueue(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/call-next")
    public ResponseEntity<QueueEntry> callNextCustomer(@RequestParam String barberId) {
        try {
            QueueEntry nextCustomer = queueService.callNextCustomer(barberId);
            return ResponseEntity.ok(nextCustomer);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/{id}/complete")
    public ResponseEntity<QueueEntry> completeService(@PathVariable String id) {
        try {
            QueueEntry completedEntry = queueService.completeService(id);
            return ResponseEntity.ok(completedEntry);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getQueueStats() {
        Map<String, Object> stats = new HashMap<>();
        long queueSize = queueService.getQueueSize();
        stats.put("queueSize", queueSize);
        stats.put("estimatedWaitTime", queueService.calculateWaitTime((int) queueSize + 1));
        return ResponseEntity.ok(stats);
    }
}
