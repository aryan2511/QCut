package com.colorcut.hairstylist.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.colorcut.hairstylist.Entity.Barber;
import com.colorcut.hairstylist.Repository.BarberRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BarberService {

    @Autowired
    private BarberRepository barberRepository;

    public List<Barber> getAllBarbers() {
        return barberRepository.findAll();
    }

    public Optional<Barber> getBarberById(String id) {
        return barberRepository.findById(id);
    }

    public Barber createBarber(Barber barber) {
        barber.setStatus("available"); // Default status
        return barberRepository.save(barber);
    }

    public Barber updateBarber(String id, Barber barberDetails) {
        Barber barber = barberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Barber not found"));
        
        barber.setBarberName(barberDetails.getBarberName());
        barber.setBarberPhone(barberDetails.getBarberPhone());
        barber.setBarberChairNo(barberDetails.getBarberChairNo());
        
        if (barberDetails.getStatus() != null) {
            barber.setStatus(barberDetails.getStatus());
        }
        
        if (barberDetails.getCurrentCustomerId() != null) {
            barber.setCurrentCustomerId(barberDetails.getCurrentCustomerId());
        }
        
        return barberRepository.save(barber);
    }

    public void deleteBarber(String id) {
        barberRepository.deleteById(id);
    }

    public Barber updateBarberStatus(String id, String status) {
        Barber barber = barberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Barber not found"));
        barber.setStatus(status);
        return barberRepository.save(barber);
    }

    public List<Barber> getAvailableBarbers() {
        return barberRepository.findByStatus("available");
    }

    public Barber assignCustomerToBarber(String barberId, String customerId) {
        Barber barber = barberRepository.findById(barberId)
                .orElseThrow(() -> new RuntimeException("Barber not found"));
        barber.setStatus("busy");
        barber.setCurrentCustomerId(customerId);
        return barberRepository.save(barber);
    }

    public Barber finishService(String barberId) {
        Barber barber = barberRepository.findById(barberId)
                .orElseThrow(() -> new RuntimeException("Barber not found"));
        barber.setStatus("available");
        barber.setCurrentCustomerId(null);
        return barberRepository.save(barber);
    }
}
