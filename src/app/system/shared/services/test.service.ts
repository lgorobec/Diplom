import { Injectable } from '@angular/core';
import {BaseApi} from '../../../shared/core/base-api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Test} from '../../../shared/models/test.model';

@Injectable()
export class TestService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getAllTestsByUser(): Observable <Test[]> {
    const user = JSON.parse(window.localStorage.getItem('user'));
    return this.get(`tests?id_user=${user.id}`);
  }
}
