package sn.edu.ugb.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminController {

    @GetMapping("/api/admin/test")
    public String adminOnly() {
        return "Accessible uniquement aux ADMIN";
    }
}