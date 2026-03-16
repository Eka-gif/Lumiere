package sn.edu.ugb.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.edu.ugb.demo.entity.AuditLog;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
}
