import {Component} from '@angular/core';
import {InvoiceService} from "../services/invoice.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-payment-link',
  templateUrl: './payment-link.component.html',
  styleUrls: ['./payment-link.component.css']
})
export class PaymentLinkComponent {
  paymentLink = "";

  constructor(private invoiceService: InvoiceService, private snackbar: MatSnackBar) {
  }

  generatePayment(invoiceNumber: any) {
    this.invoiceService.generatePaymentLink(invoiceNumber.value).subscribe(
      (response) => {
        this.paymentLink = response.paymentLink;
        this.showSuccessAlert("Link Generated")

      },
      (error) => {
        console.error('Error generating payment link:', error);
        this.showErrorAlert(error.error)
      }
    );
  }

  copyToClipboard() {
    const inputElement = document.createElement('input');
    inputElement.value = this.paymentLink || '';
    document.body.appendChild(inputElement);
    inputElement.select();
    document.execCommand('copy');
    document.body.removeChild(inputElement);
    this.showSuccessAlert("Copied to clipboard")
  }

  private showSuccessAlert(message: string): void {
    this.snackbar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
  }

  private showErrorAlert(message: string): void {
    this.snackbar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }
}
