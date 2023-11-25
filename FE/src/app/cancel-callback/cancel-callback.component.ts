import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-cancel-callback',
  templateUrl: './cancel-callback.component.html',
  styleUrls: ['./cancel-callback.component.css']
})
export class CancelCallbackComponent {
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const invoiceNumber = params['invoiceNumber'];
      // Handle cancel callback with the invoiceNumber
      console.log('Cancel Callback for Invoice:', invoiceNumber);
    });
  }
}
