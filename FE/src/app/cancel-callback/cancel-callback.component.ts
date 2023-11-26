import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-cancel-callback',
  templateUrl: './cancel-callback.component.html',
  styleUrls: ['./cancel-callback.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: 0}),
        animate('300ms', style({opacity: 1})),
      ]),
    ]),
  ],
})
export class CancelCallbackComponent {
  invoiceNumber: string = '';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.invoiceNumber = params['invoiceNumber'];
      // Handle cancel callback with the invoiceNumber
      console.log('Cancel Callback for Invoice:', this.invoiceNumber);
    });
  }
}
