/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.root4j.sb.repositories;

import net.root4j.sb.entities.Pais;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author rjay
 */
@Repository
public interface PaisRepository extends CrudRepository<Pais, String> {

    Iterable<Pais> findAllByOrderByCodigo();
}
