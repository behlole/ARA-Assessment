// services/invoice.service.ts
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private apiUrl = environment.API_URL; // Update with your server URL

  constructor(private http: HttpClient) {
  }

  createInvoice(invoice: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/invoices`, invoice);
  }

  getAllInvoices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/invoices`);
  }

  getInvoiceById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/invoices/${id}`);
  }

  updateInvoice(id: string, updatedInvoice: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/invoices/${id}`, updatedInvoice);
  }

  deleteInvoice(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/invoices/${id}`);
  }

  generatePaymentLink(invoiceNumber: string): Observable<any> {
    const url = `${this.apiUrl}/invoices/generate-payment-link`;
    return this.http.post<any>(url, {invoiceNumber});
  }
}
