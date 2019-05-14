import {Injectable} from '@angular/core';

import {User} from '../models/user.model';
import {BaseApi} from '../core/base-api';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class UsersService extends BaseApi {

  user: User;

  constructor(public http: HttpClient,
              private authService: AuthService,
              private router: Router ) {
    super(http);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.get(`users?email=${username}`);
  }

  createNewUser(user: User): Observable <User> {
    return this.post('user', user);
  }

  LogIn() {
    return new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  CheckPassword(username, password) {
    this.getUserByUsername(username).subscribe((data: User) => {
      if (data) {
        if (data.password === password) {
          this.authService.logIn();
          this.router.navigate(['/system', 'profile']);
          const user = {name: data.name, email: data.email, password: data.password, id: data.id};
          window.localStorage.setItem('user', JSON.stringify(user));
          this.user = data;
        } else {
          alert('Password is wrong!');
        }
      } else {
        alert('This username is not exist!');
      }
    });
  }

  CheckLocalStorage() {
    if (window.localStorage.getItem('user')) {
      const userj = JSON.parse(window.localStorage.getItem('user'));
      this.getUserByUsername(userj.email).subscribe((user: User) => {
        if (user) {
          if (user.password === userj.password) {
            this.authService.isAuthorated = true;
            this.user = user;
            this.router.navigate(['/system', 'profile']);
          }
        }
      });
    }
  }

  CheckLocalStorageForSystem() {
    if (window.localStorage.getItem('user')) {
      const userj = JSON.parse(window.localStorage.getItem('user'));
      this.getUserByUsername(userj.email).subscribe((user: User) => {
        if (user) {
          if (user.password === userj.password) {
            this.authService.isAuthorated = true;
            this.user = user;
          } else {
            this.router.navigate(['/auth', 'signin']);
          }
        }
      });
    } else {
      this.router.navigate(['/auth', 'signin']);
    }
  }

  Registration() {
    return new FormGroup({
      name: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      agree: new FormControl(false, [Validators.requiredTrue])
    });
  }

  updateUser(user_id, user): Observable <User> {
    return this.put(`users/${user_id}`, user);
  }
}
