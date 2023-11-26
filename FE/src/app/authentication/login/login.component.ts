import {Component} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  login() {
    this.authenticationService.login({email: this.email, password: this.password}).subscribe((data: any) => {
      if (data.status == 200) {
        localStorage.setItem('token', data.data);
        this.router.navigate(['dashboard'])
        this.showSuccessAlert(data.message)
      }
      if (data.status == 500) {
        console.log(data.message)
        this.showErrorAlert(data.message)
      }
    }, (error) => {
      console.log(error.error.message)
      this.showErrorAlert(error.error.message)
    })
  }

  private showSuccessAlert(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
  }

  private showErrorAlert(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }
}
