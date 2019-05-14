import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs/Observable';
import {Dictionary} from '../models/dictionary.model';

@Injectable()
export class DictionaryService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  createNewDictionary(dic: Dictionary): Observable <Dictionary>{
    return this.post('dictionary', dic);
  }

  getDictionaryByUser(id_user: number): Observable <Dictionary> {
    return this.get(`dictionary?id_user=${id_user}`);
  }

}
