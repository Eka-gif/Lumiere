import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class DashboardAdminComponent implements OnInit {

  stats: any = {};
  lowStockProducts: any[] = [];
  recentProducts: any[] = [];

  totalEntrees = 0;
  totalSorties = 0;

  productsChart: any;
  stockChart: any;

  constructor(private http: HttpClient, private stockService: StockService) {}

  ngOnInit(): void {

    this.loadStats();
    this.loadLowStockProducts();
    this.loadRecentProducts();

    this.stockService.getTotalEntrees().subscribe(data => {
      this.totalEntrees = data || 0;
      this.loadStockChart();
    });

    this.stockService.getTotalSorties().subscribe(data => {
      this.totalSorties = data || 0;
      this.loadStockChart();
    });

    this.loadProductsChart();
  }


  loadStats() {
    this.http.get<any>('http://localhost:8080/api/admin/stats')
      .subscribe({
        next: (data) => {
          console.log("STATS :", data);
          this.stats = data;
        },
        error: (err) => {
          console.error("Erreur API :", err);
        }
      });
  }

  loadProductsChart() {

    this.http.get('http://localhost:8080/api/admin/products-by-category')
      .subscribe((data:any) => {

        if(this.productsChart){
          this.productsChart.destroy();
        }

        this.productsChart = new Chart("productsChart", {
          type: 'pie',
          data: {
            labels: Object.keys(data),
            datasets: [{
              data: Object.values(data)
            }]
          },
          options:{
            responsive:true,
            maintainAspectRatio:false
          }
        });

      });

  }

  loadStockChart(){

    if(this.stockChart){
      this.stockChart.destroy();
    }

    this.stockChart = new Chart("stockChart", {
      type: 'bar',
      data: {
        labels: ['Entrées', 'Sorties'],
        datasets: [{
          label: 'Mouvements de stock',
          data: [this.totalEntrees, this.totalSorties]
        }]
      },
      options:{
        responsive:true,
        maintainAspectRatio:false
      }
    });

  }


  loadLowStockProducts() {
    this.http.get<any[]>('http://localhost:8080/api/admin/low-stock')
      .subscribe(data => {
        this.lowStockProducts = data;
      });
  }


  loadRecentProducts() {
    this.http.get<any[]>('http://localhost:8080/api/admin/recent-products')
      .subscribe(data => {
        this.recentProducts = data;
      });
  }

  exportPdf(){

    this.http.get(
      'http://localhost:8080/api/produits/export/pdf',
      {responseType:'blob'}
    ).subscribe(blob=>{

      const file = new Blob([blob],{type:'application/pdf'});

      const url = window.URL.createObjectURL(file);

      const a = document.createElement('a');
      a.href = url;
      a.download = "rapport-stock.pdf";
      a.click();

    });

  }

  exportExcel(){

    this.http.get(
      'http://localhost:8080/api/produits/export/excel',
      {responseType:'blob'}
    ).subscribe(blob=>{

      const file = new Blob([blob]);

      const url = window.URL.createObjectURL(file);

      const a = document.createElement('a');
      a.href = url;
      a.download = "produits.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
    });

  }
}
