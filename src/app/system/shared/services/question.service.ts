import { Injectable } from '@angular/core';
import {BaseApi} from '../../../shared/core/base-api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Question} from '../../../shared/models/question.model';

@Injectable()
export class QuestionService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getAllQuestions(): Observable <Question[]> {
    return this.get('questions');
  }
}
