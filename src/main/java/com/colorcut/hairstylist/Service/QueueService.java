package com.colorcut.hairstylist.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.colorcut.hairstylist.Entity.QueueEntry;
import com.colorcut.hairstylist.Entity.QueueStatus;
import com.colorcut.hairstylist.Repository.QueueRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class QueueService {

    @Autowired
    private QueueRepository queueRepository;

    @Autowired
    private BarberService barberService;

    public List<QueueEntry> getAllQueueEntries() {
        return queueRepository.findByStatusOrderByPositionAsc(QueueStatus.WAITING);
    }

    public Optional<QueueEntry> getQueueEntryById(String id) {
        return queueRepository.findById(id);
    }

    public QueueEntry addToQueue(QueueEntry queueEntry) {
        long currentQueueSize = queueRepository.countByStatus(QueueStatus.WAITING);
        queueEntry.setPosition((int) currentQueueSize + 1);
        queueEntry.setStatus(QueueStatus.WAITING);
        queueEntry.setJoinedAt(LocalDateTime.now());
        return queueRepository.save(queueEntry);
    }

    public void removeFromQueue(String id) {
        queueRepository.deleteById(id);
        reorderQueue();
    }

    public QueueEntry callNextCustomer(String barberId) {
        List<QueueEntry> waitingCustomers = queueRepository.findByStatusOrderByPositionAsc(QueueStatus.WAITING);
        
        if (waitingCustomers.isEmpty()) {
            throw new RuntimeException("No customers in queue");
        }

        QueueEntry nextCustomer = waitingCustomers.get(0);
        nextCustomer.setStatus(QueueStatus.IN_PROGRESS);
        nextCustomer.setBarberId(barberId);
        
        // Assign customer to barber
        barberService.assignCustomerToBarber(barberId, nextCustomer.getId());
        
        queueRepository.save(nextCustomer);
        reorderQueue();
        
        return nextCustomer;
    }

    public QueueEntry completeService(String queueEntryId) {
        QueueEntry entry = queueRepository.findById(queueEntryId)
                .orElseThrow(() -> new RuntimeException("Queue entry not found"));
        
        entry.setStatus(QueueStatus.DONE);
        
        // Free up the barber
        if (entry.getBarberId() != null) {
            barberService.finishService(entry.getBarberId());
        }
        
        return queueRepository.save(entry);
    }

    private void reorderQueue() {
        List<QueueEntry> waitingCustomers = queueRepository.findByStatusOrderByPositionAsc(QueueStatus.WAITING);
        
        for (int i = 0; i < waitingCustomers.size(); i++) {
            QueueEntry entry = waitingCustomers.get(i);
            entry.setPosition(i + 1);
            queueRepository.save(entry);
        }
    }

    public long getQueueSize() {
        return queueRepository.countByStatus(QueueStatus.WAITING);
    }

    public int calculateWaitTime(int position) {
        long availableBarbers = barberService.getAvailableBarbers().size();
        long totalBarbers = barberService.getAllBarbers().size();
        
        if (totalBarbers == 0) return 0;
        if (availableBarbers > 0 && position == 1) return 0;
        
        int avgServiceTime = 25; // minutes
        return (int) Math.ceil((position / (double) totalBarbers) * avgServiceTime);
    }
}
