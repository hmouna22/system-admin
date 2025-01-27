import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../services/asset.service';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {
  assets: any[] = [];

  constructor(private assetService: AssetService) {}

  ngOnInit(): void {
    this.assetService.getAssets().subscribe((data)=> {
      this.assets = data;
    });
  }

  // Export data to Excel
  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.assets);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Assets');
    XLSX.writeFile(wb, 'assets.xlsx');
  }

  // Export data to PDF
  exportToPDF(): void {
    const doc = new jsPDF();

    let y = 10;
    doc.setFontSize(16);
    doc.text('Assets List', 10, y);
    y += 10;

    doc.setFontSize(12);
    const columns = ['Name', 'Status', 'Location', 'IP Address', 'Next Preventive Maintenance'];
    const rows = this.assets.map((asset) => [
      asset.name,
      asset.status,
      asset.location,
      asset.ip_address,
      asset.next_preventive_maintenance,
    ]);

    autoTable(doc, {
      startY: y,
      head: [columns],
      body: rows,
    });

    doc.save('assets.pdf');
  }
}
