import {CanActivateFn, Router} from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    if (localStorage.getItem('token')) {
        return true;
    } else {
        let router = new Router();
        router.navigate(['auth/login'])
        return false;
    }
};
export const doesShowLogin: CanActivateFn = (router, state) => {
    if (localStorage.getItem('token')) {
        let router = new Router();
        router.navigate(['dashboard'])
        return false;
    } else {
        return true;
    }
}
