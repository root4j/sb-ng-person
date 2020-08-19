/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.root4j.sb.controllers;

import java.util.Optional;
import net.root4j.sb.entities.Ciudad;
import net.root4j.sb.repositories.CiudadRepository;
import net.root4j.sb.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author rjay
 */
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(Constants.API_CIUDAD_URL)
public class CiudadController {

    private final CiudadRepository repository;

    @Autowired
    public CiudadController(CiudadRepository repository) {
        this.repository = repository;
    }

    @GetMapping()
    public Iterable<Ciudad> list() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Iterable<Ciudad> get(@PathVariable String id) {
        return repository.findByDpto_Codigo(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> put(@PathVariable String id, @RequestBody Ciudad input) {
        try {
            Optional<Ciudad> compare = repository.findById(id);
            if (compare.isPresent() && compare.get().getCodigo().equals(input.getCodigo())) {
                repository.save(input);
                return new ResponseEntity<>(input, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(Constants.MSG_NOT_EQUALS_ERROR, HttpStatus.CONFLICT);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<?> post(@RequestBody Ciudad input) {
        try {
            Optional<Ciudad> compare = repository.findById(input.getCodigo());
            if (compare.isEmpty()) {
                repository.save(input);
                return new ResponseEntity<>(input, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(Constants.MSG_PRIMARY_KEY_ERROR, HttpStatus.CONFLICT);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        try {
            Optional<Ciudad> input = repository.findById(id);
            if (input.isPresent()) {
                repository.deleteById(id);
                return new ResponseEntity<>(input, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(Constants.MSG_NOT_EQUALS_ERROR, HttpStatus.CONFLICT);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR, reason = "Error message")
    public void handleError() {
    }
}