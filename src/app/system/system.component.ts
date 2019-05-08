import { Component, OnInit } from '@angular/core';
import {UsersService} from '../shared/services/users.service';
import {TestService} from './shared/services/test.service';
import {Test} from '../shared/models/test.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.less']
})
export class SystemComponent implements OnInit {

  is_open_menu = false;

  constructor(private userService: UsersService,
              private testService: TestService,
              private router: Router) { }

  ngOnInit() {
    this.userService.CheckLocalStorageForSystem();
    this.testService.getAllTestsByUser().subscribe((tests: Test[]) => {
      if (tests.length < 1) {
        this.router.navigate(['/system', 'test']);
      }
    });
  }

  onChanged(event) {
    this.is_open_menu = event;
  }
}
