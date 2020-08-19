/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.root4j.sb.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author rjay
 */
@Controller
public class MainController {
    
    static String ROUTE_URL = "index";

    @RequestMapping("/")
    public String index(Model model) {
        return "index";
    }
}
