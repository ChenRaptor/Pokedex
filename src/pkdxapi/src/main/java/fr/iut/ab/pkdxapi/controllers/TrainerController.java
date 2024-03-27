package fr.iut.ab.pkdxapi.controllers;

import org.springframework.web.bind.annotation.RestController;

import fr.iut.ab.pkdxapi.models.TrainerDTO;
import fr.iut.ab.pkdxapi.models.TrainerData;
import fr.iut.ab.pkdxapi.services.TrainerService;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class TrainerController {

    @Autowired
    private TrainerService TrainerService;

    @PostMapping("/trainer")
    public TrainerData postTrainer(@RequestBody TrainerDTO trainerCreationData) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return TrainerService.postTrainer(trainerCreationData, username);
    }

    @GetMapping("/trainer")
    public TrainerData getTrainer() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return TrainerService.getTrainer(username);
    }

    @PutMapping("/trainer")
    public void updateTrainer(@RequestBody TrainerDTO trainerCreationData) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        TrainerService.updateTrainer(username, trainerCreationData);
    }

    @DeleteMapping("/trainer")
    public void deleteTrainer() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        TrainerService.deleteTrainer(username);
    }

    @PostMapping("/trainer/mark")
    public void mark(@RequestParam boolean captured, @RequestParam ObjectId pkmnId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        TrainerService.mark(username, captured, pkmnId);
    }
}
