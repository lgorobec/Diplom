import { Injectable } from '@angular/core';
import {BaseApi} from '../../../shared/core/base-api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Methodic} from '../../../shared/models/methodic.model';

@Injectable()
export class MethodicService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getAllMethodics(): Observable <Methodic[]> {
    return this.get('methodics');
  }
}
