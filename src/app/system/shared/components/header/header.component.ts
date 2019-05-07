import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  nowDate = new Date();
  name = JSON.parse(window.localStorage.getItem('user')).name;

  constructor() { }

  ngOnInit() {
  }

}
