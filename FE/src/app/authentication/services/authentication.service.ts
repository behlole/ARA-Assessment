import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private httpClient: HttpClient) {
    }

    login({email, password}: { email: String, password: String }) {
        return this.httpClient.post(environment.API_URL + "/auth/login", {email, password});
    }
}
