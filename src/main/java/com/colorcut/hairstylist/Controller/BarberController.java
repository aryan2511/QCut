package com.colorcut.hairstylist.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.colorcut.hairstylist.Entity.Barber;
import com.colorcut.hairstylist.Service.BarberService;

import java.util.List;

@RestController
@RequestMapping("/api/barbers")
@CrossOrigin(origins = "*")
public class BarberController {

    @Autowired
    private BarberService barberService;

    @GetMapping
    public ResponseEntity<List<Barber>> getAllBarbers() {
        return ResponseEntity.ok(barberService.getAllBarbers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Barber> getBarberById(@PathVariable String id) {
        return barberService.getBarberById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Barber> createBarber(@RequestBody Barber barber) {
        Barber createdBarber = barberService.createBarber(barber);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBarber);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Barber> updateBarber(@PathVariable String id, @RequestBody Barber barber) {
        try {
            Barber updatedBarber = barberService.updateBarber(id, barber);
            return ResponseEntity.ok(updatedBarber);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBarber(@PathVariable String id) {
        barberService.deleteBarber(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Barber> updateBarberStatus(
            @PathVariable String id,
            @RequestParam String status) {
        try {
            Barber updatedBarber = barberService.updateBarberStatus(id, status);
            return ResponseEntity.ok(updatedBarber);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/available")
    public ResponseEntity<List<Barber>> getAvailableBarbers() {
        return ResponseEntity.ok(barberService.getAvailableBarbers());
    }

    @PostMapping("/{id}/finish-service")
    public ResponseEntity<Barber> finishService(@PathVariable String id) {
        try {
            Barber barber = barberService.finishService(id);
            return ResponseEntity.ok(barber);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
