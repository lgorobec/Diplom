import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../shared/services/users.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.less']
})
export class SigninComponent implements OnInit {

  form: FormGroup;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.form = this.usersService.LogIn();

    this.usersService.CheckLocalStorage();
  }

  onSubmit() {
    this.usersService.CheckPassword(this.form.value.email, this.form.value.password);
  }

}
