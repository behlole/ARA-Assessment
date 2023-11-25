import {Component} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    email: string = '';
    password: string = '';

    constructor(private authenticationService: AuthenticationService, private router: Router) {
    }

    login() {
        this.authenticationService.login({email: this.email, password: this.password}).subscribe((data: any) => {
            if (data.status == 200) {
                localStorage.setItem('token', data.data);
                this.router.navigate(['dashboard'])
            }
            if (data.status == 500) {
                console.log(data.message)
            }
        }, (error) => {
            console.log(error.error.message)
        })
    }
}
