import { Injectable } from '@angular/core';
import {BaseApi} from '../../../shared/core/base-api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../../../shared/models/category.model';

@Injectable()
export class CategoryService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getAllCategoriesByUser(): Observable <Category[]> {
    const user = JSON.parse(window.localStorage.getItem('user'));
    return this.get(`categories?id_user=${user.id}`);
  }

  addCategory(cat: Category): Observable <Category> {
    return this.post('categories', cat);
  }
}
