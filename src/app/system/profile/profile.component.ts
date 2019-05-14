import { Component, OnInit } from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {WordService} from '../shared/services/word.service';
import {UsersService} from '../../shared/services/users.service';
import {TestService} from '../shared/services/test.service';
import {Word} from '../../shared/models/word.model';
import {Test} from '../../shared/models/test.model';
import {User} from '../../shared/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    }
  };
  public pieChartLabels: Label[] = ['Количество выученных слов', 'Количество не выученных слов'];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  public pieChartOptions2: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    }
  };
  public pieChartLabels2: Label[] = ['Мнемоника', 'Карточки', 'Аудио'];
  public pieChartData2: number[] = [];
  public pieChartType2: ChartType = 'pie';
  public pieChartLegend2 = true;
  public pieChartColors2 = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  name = '';
  email = '';
  password = '';

  constructor(private wordService: WordService,
              private userService: UsersService,
              private testService: TestService) { }

  ngOnInit() {
    this.wordService.getAllWordsByUser().subscribe((data: Word[]) => {
      if (data.length > 0) {
        let col = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].is_learned > 2) {
            col += 1;
          }
        }
        this.pieChartData = [col, data.length - col];
      } else {
        this.pieChartData = [0, data.length];
      }
    });
    this.testService.getAllTestsByUser().subscribe((data: Test[]) => {
      if (data.length > 0) {
        let col1 = 0;
        let col2 = 0;
        let col3 = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].id_methodic == 1) {
            col1 += 1;
          } else if (data[i].id_methodic == 2) {
            col2 += 1;
          } else {
            col3 += 1;
          }
        }
        this.pieChartData2 = [col3, col2, col1];
      } else {
        this.pieChartData2 = [0, 0, 0];
      }
    });
    const user = JSON.parse(window.localStorage.getItem('user'));
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
  }

  saveSettings() {
    const date = new Date();
    const user = JSON.parse(window.localStorage.getItem('user'));
    const userNew = new User(this.email, this.password, date, this.name);
    this.userService.updateUser(user.id, userNew).subscribe((data: User) => {
      if (user) {
        window.localStorage.setItem('user', JSON.stringify(data));
      }
    });
  }
}
