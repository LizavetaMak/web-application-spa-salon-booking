import { BehaviorSubject } from 'rxjs';

import config from 'config';
import { handleResponse } from '@/_helpers';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    registration,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
    console.log("2222222222222222222222")
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            let user2={
                id:user.user[0].id_user,
                id_master:user.user[0].id_employee,
                role: user.user[0].role,
                token: user.token,
                name:user.user[0].name,
                phone: user.user[0].phone,
                birthday_user: user.user[0].birthday_user,
                email:user.user[0].email
            }
            console.log(user2);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user2));
            currentUserSubject.next(user2);

            return user2;
        });
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
function registration(name, password, login, phone, birthday_user )
{


    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password, name, phone, birthday_user  })
    };

    return fetch(`${config.apiUrl}/users/registration`, requestOptions)
        .then(handleResponse);

}