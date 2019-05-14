import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../shared/services/category.service';
import {Category} from '../../shared/models/category.model';
import {Word} from '../../shared/models/word.model';
import {WordService} from '../shared/services/word.service';
import {angularMath} from 'angular-ts-math';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.less']
})
export class CardsComponent implements OnInit {

  categories: Category [];
  neededWords: Word [];
  currentCat = -1;
  process = 0;
  index = 0;
  answer = '';
  colLearned = 0;

  constructor(private categoryService: CategoryService,
              private wordsService: WordService) { }

  ngOnInit() {
    this.categoryService.getAllCategoriesByUser().subscribe((cats: Category[]) => {
      if (cats.length > 0) {
        this.categories = cats;
      }
    });
  }

  goLearn() {
    if (this.currentCat !== -1) {
      this.wordsService.getAllWordsByCategory(this.currentCat).subscribe((words: Word[]) => {
        if (words.length > 0) {
          this.neededWords = words;
          this.neededWords.sort(this.compareRandom);
          this.process = 1;
        }
      });
    } else {
      this.wordsService.getAllWordsByUser().subscribe((words: Word[]) => {
        if (words.length > 0) {
          this.neededWords = words;
          this.neededWords.sort(this.compareRandom);
          this.process = 1;
        }
      });
    }
  }

  compareRandom(a, b) {
    return angularMath.getRandom() - 0.5;
  }

  nextWord() {
    if (this.answer === this.neededWords[this.index].word_tr) {
      const wordNew = new Word(this.neededWords[this.index].id_category,
                               this.neededWords[this.index].id_user,
                               this.neededWords[this.index].word_or,
                               this.neededWords[this.index].word_tr,
                     + this.neededWords[this.index].is_learned + 1);
      this.wordsService.updateWord(this.neededWords[this.index].id, wordNew).subscribe((data: Word) => {
        if (data) {
          this.colLearned += 1;
        }
      });
    }
    if (this.index < this.neededWords.length - 1) {
      this.index += 1;
    } else {
      this.process = 2;
    }
    this.answer = '';
  }

}
