package sn.edu.ugb.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.edu.ugb.demo.entity.AuditLog;
import sn.edu.ugb.demo.repository.AuditLogRepository;
import java.time.LocalDateTime;

@Service
public class AuditService {

    @Autowired
    private AuditLogRepository auditLogRepository;

    public void log(String username, String action, String entity){

        AuditLog log = new AuditLog();

        log.setUsername(username);
        log.setAction(action);
        log.setEntity(entity);
        log.setDate(LocalDateTime.now());

        auditLogRepository.save(log);

    }

}
