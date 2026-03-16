import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditService } from '../../services/audit-log.service';
import { AuditLog } from '../../models/audit-log';

@Component({
  selector: 'app-admin-audit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.css']
})
export class AdminAuditComponent implements OnInit {

  logs: AuditLog[] = [];

  constructor(private auditService: AuditService) {}

  ngOnInit(): void {
    console.log('AdminAuditComponent initialisé');
    this.loadLogs();
  }

  loadLogs(){
    console.log('Chargement des logs...');

    this.auditService.getLogs().subscribe({
      next: (data) => {
        console.log('Données reçues du serveur:', data);
        console.log('Nombre de logs reçus:', data.length);
        this.logs = data;

        if (data.length === 0) {
          console.log('Aucun log trouvé - la table est vide');
        } else {
          console.log('Premier log:', data[0]);
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des logs:', err);
      }
    });
  }


  refreshLogs(): void {
    console.log('Rafraîchissement manuel...');
    this.loadLogs();
  }
}
