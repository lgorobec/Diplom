import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {

  @Output() onChanged = new EventEmitter<boolean>();
  is_open_menu = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  LogOut() {
    window.localStorage.clear();
    this.router.navigate(['/auth', 'signin']);
  }

  clickMenu() {
    this.is_open_menu = !this.is_open_menu;
    this.onChanged.emit(this.is_open_menu);
  }
}
