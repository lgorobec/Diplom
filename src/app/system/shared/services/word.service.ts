import { Injectable } from '@angular/core';
import {BaseApi} from '../../../shared/core/base-api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Word} from '../../../shared/models/word.model';

@Injectable()
export class WordService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getAllWordsByCategory(cat): Observable <Word[]> {
    return this.get(`words?id_category=${cat}`);
  }

  getAllWordsByUser(): Observable <Word[]> {
    const user = JSON.parse(window.localStorage.getItem('user'));
    return this.get(`words?id_user=${user.id}`);
  }

  updateWord(wordId, word: Word): Observable <Word> {
    return this.put(`words/${wordId}`, word);
  }

  findPictureByWord(word): Observable <any> {
    return this.getPic(`https://api.unsplash.com/search/photos?client_id=32172648d050557e6208dd57edabb0abc69fedeb5455b3299589366c9c30c838&page=1&query=${word}`);
  }

  deleteWord(word_id): Observable <Word> {
    return this.delete(`words/${word_id}`);
  }

  addWord(word: Word): Observable <Word> {
    return this.post('words', word);
  }
}
