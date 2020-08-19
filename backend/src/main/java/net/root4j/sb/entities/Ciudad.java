/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.root4j.sb.entities;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author rjay
 */
@Entity
@Table(name = "CIUDAD")
@XmlRootElement
public class Ciudad implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "CODIGO", length = 5, nullable = false)
    private String codigo;

    @Column(name = "NOMBRE", length = 200, nullable = false)
    private String nombre;

    @JoinColumn(name = "DEPTOCOD", referencedColumnName = "CODIGO")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private Departamento dpto;

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

    public Departamento getDpto() {
        return dpto;
    }

    public void setDpto(Departamento dpto) {
        this.dpto = dpto;
    }
}
