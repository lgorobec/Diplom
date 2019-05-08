import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../shared/services/category.service';
import {Category} from '../../shared/models/category.model';
import {Word} from '../../shared/models/word.model';
import {ArrayType} from '@angular/compiler';
import {WordService} from '../shared/services/word.service';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.less']
})
export class DictionaryComponent implements OnInit {

  categories: Category [];
  neededWords: Word [];
  changedWord = [];
  currentCategory = -1;
  words: Word[];
  addingWord = false;
  word_or = '';
  word_tr = '';
  addingCat = '';

  constructor(private categoryService: CategoryService,
              private wordService: WordService) { }

  ngOnInit() {
    this.categoryService.getAllCategoriesByUser().subscribe((cats: Category[]) => {
      if (cats.length > 0) {
        this.categories = cats;
      }
    });
    this.wordService.getAllWordsByUser().subscribe((data: Word[]) => {
      if (data.length > 0) {
        this.neededWords = data;
        this.words = this.neededWords.slice();
        this.changedWord.length = this.neededWords.length;
        for (let i = 0; i < this.neededWords.length; i++) {
          this.changedWord[i] = true;
        }
      }
    });
  }

  changeCategory() {
    if (this.currentCategory == -1) {
      this.wordService.getAllWordsByUser().subscribe((data: Word[]) => {
        if (data.length > 0) {
          this.neededWords = data;
          this.words = this.neededWords.slice();
          this.changedWord.length = this.neededWords.length;
          for (let i = 0; i < this.neededWords.length; i++) {
            this.changedWord[i] = true;
          }
        }
      });
    } else {
      this.wordService.getAllWordsByCategory(this.currentCategory).subscribe((data: Word[]) => {
        if (data.length > 0) {
          this.neededWords = data;
          this.words = this.neededWords.slice();
          this.changedWord.length = this.neededWords.length;
          for (let i = 0; i < this.neededWords.length; i++) {
            this.changedWord[i] = true;
          }
        } else {
          this.neededWords = [];
          this.words = [];
          this.changedWord = [];
        }
      });
    }
  }

  addWord() {
    if (this.word_or !== '' && this.word_tr !== '')
    {
      const wd = new Word(+this.currentCategory,
        this.neededWords[0].id_user,
        this.word_or,
        this.word_tr,
        0);
      this.wordService.addWord(wd).subscribe((data: Word) => {
        if (data) {
          this.neededWords.push(data);
          this.words.push(data);
          this.changedWord.push(true);
          this.addingWord = false;
          this.word_tr = '';
          this.word_or = '';
        }
      });
    }
  }

  wantAddWord() {
    this.addingWord = true;
  }

  changeWord(index) {
    this.changedWord[index] = false;
  }

  saveWord(index) {
    this.wordService.updateWord(this.words[index].id, this.words[index]).subscribe((data: Word) => {
      if (data) {
        this.neededWords[index] = data;
        this.changedWord[index] = true;
      }
    });
  }

  deleteWord(index) {
    this.wordService.deleteWord(this.neededWords[index].id).subscribe((data: Word) => {
      this.neededWords.splice(index, 1);
      this.words.splice(index, 1);
    });
  }

  addCategory() {
    if (this.addingCat != '') {
      const category = new Category(this.neededWords[0].id_user, this.addingCat, this.neededWords[0].id_user);
      this.categoryService.addCategory(category).subscribe((data: Category) => {
        if (data) {
          this.categories.push(data);
          this.currentCategory = data.id;
          this.addingCat = '';
          this.changeCategory();
        }
      });
    }
  }

  sortWordsOr(prev, next) {
    if ( prev.word_or < next.word_or ) return -1;
    if ( prev.word_or > next.word_or ) return 1;
  }

  sortWordsTr(prev, next) {
    if ( prev.word_tr < next.word_tr ) return -1;
    if ( prev.word_tr > next.word_tr ) return 1;
  }

  sort(n) {
    if (n === 1) {
      this.neededWords.sort(this.sortWordsOr);
      this.words.sort(this.sortWordsOr);
    } else {
      this.neededWords.sort(this.sortWordsTr);
      this.words.sort(this.sortWordsTr);
    }
  }
}
