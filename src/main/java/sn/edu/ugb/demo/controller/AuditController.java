package sn.edu.ugb.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sn.edu.ugb.demo.entity.AuditLog;
import sn.edu.ugb.demo.repository.AuditLogRepository;

import java.util.List;


    @RestController
    @RequestMapping("/api/audit")
    public class AuditController {

        @Autowired
        private AuditLogRepository auditLogRepository;

        @GetMapping
        public List<AuditLog> getLogs(){
            return auditLogRepository.findAll();
        }

    }

