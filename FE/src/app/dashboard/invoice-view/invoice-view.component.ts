// invoice-view.component.ts
import {Component, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {InvoiceService} from "../services/invoice.service";

@Component({
    selector: 'app-invoice-view',
    templateUrl: './invoice-view.component.html',
    styleUrls: ['./invoice-view.component.css'],
})
export class InvoiceViewComponent {
    // Sample data, replace with actual data from your backend
    invoices = [
        {
            invoiceIdentifier: 'INV#12345',
            customerName: 'Customer A',
            contactDetails: 'customerA@email.com',
            invoiceDate: new Date('2023-01-01'),
            dueDate: new Date('2023-02-01'),
            amountDue: 100.50,
            paymentStatus: 'Paid'
        },
        // {
        //     invoiceIdentifier: 'INV#54321',
        //     customerName: 'Customer B',
        //     contactDetails: 'customerB@email.com',
        //     invoiceDate: new Date('2023-02-01'),
        //     dueDate: new Date('2023-03-01'),
        //     amountDue: 200.75,
        //     paymentStatus: 'Pending'
        // },
        // Add more invoice data as needed
    ];
    @ViewChild(MatSort) sort!: MatSort;
    displayedColumns: string[] = ['invoiceIdentifier', 'customerName', 'contactDetails', 'invoiceDate', 'dueDate', 'amountDue', 'paymentStatus'];
    filteredInvoices: any[] = [];
    searchText: string = '';

    constructor(private invoiceService: InvoiceService) {
    }

    ngOnInit(): void {
        this.loadInvoices();
    }

    loadInvoices(): void {
        this.invoiceService.getAllInvoices().subscribe((invoices) => {
            this.invoices = invoices;
            this.filteredInvoices = invoices;
        });
    }

    applyFilter() {
        const lowerCaseSearchText = this.searchText.toLowerCase();
        this.filteredInvoices = this.invoices.filter(invoice =>
            Object.values(invoice).some(value => value && value.toString().toLowerCase().includes(lowerCaseSearchText))
        );
    }
}
