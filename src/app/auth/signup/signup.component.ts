import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../shared/models/user.model';
import {Dictionary} from '../../shared/models/dictionary.model';
import {DictionaryService} from '../../shared/services/dictionary.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

  form: FormGroup;

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private router: Router,
    private dictionaryService: DictionaryService) { }

  ngOnInit() {
    this.form = this.userService.Registration();
  }

  onSubmit() {
    const user = new User(this.form.value.email, this.form.value.password, new Date(), this.form.value.name);

    this.userService.createNewUser(user)
      .subscribe((newuser: User) => {
        if (newuser) {
          const dict = new Dictionary(newuser.id);
          this.userService.user = newuser;
          this.dictionaryService.createNewDictionary(dict).subscribe((newdict: Dictionary) => {
            if (newdict) {
              this.router.navigate(['/auth', 'signin']);
            }
          });
        }
      });
  }
}
