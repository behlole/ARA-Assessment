// invoice-view.component.ts
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {InvoiceService} from '../services/invoice.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.css'],
})
export class InvoiceViewComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['invoiceIdentifier', 'customerName', 'contactDetails', 'invoiceDate', 'dueDate', 'amountDue', 'paymentStatus'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private invoiceService: InvoiceService) {
  }

  ngOnInit() {
    this.loadInvoices();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadInvoices(): void {
    this.invoiceService.getAllInvoices().subscribe((invoices) => {
      this.dataSource.data = invoices;
    });
  }
}
