/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.root4j.sb.entities;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author rjay
 */
@Entity
@Table(name = "PAIS")
@XmlRootElement
public class Pais implements Serializable {
    
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "CODIGO", length = 2, nullable = false)
    private String codigo;
    
    @Column(name = "NOMBRE", length = 200, nullable = false)
    private String nombre;

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}