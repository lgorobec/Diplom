import { Component, OnInit } from '@angular/core';
import {Category} from '../../shared/models/category.model';
import {Word} from '../../shared/models/word.model';
import {CategoryService} from '../shared/services/category.service';
import {WordService} from '../shared/services/word.service';
import {angularMath} from 'angular-ts-math';

@Component({
  selector: 'app-association',
  templateUrl: './association.component.html',
  styleUrls: ['./association.component.less']
})
export class AssociationComponent implements OnInit {

  categories: Category [];
  neededWords: Word [];
  currentCat = -1;
  process = 0;
  index = 0;
  answer = '';
  colLearned = 0;
  urlPicture = '';

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
          this.findPicture(this.neededWords[this.index].word_or);
        }
      });
    } else {
      this.wordsService.getAllWordsByUser().subscribe((words: Word[]) => {
        if (words.length > 0) {
          this.neededWords = words;
          this.neededWords.sort(this.compareRandom);
          this.process = 1;
          this.findPicture(this.neededWords[this.index].word_or);
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
        this.neededWords[this.index].is_learned + 1);
      this.wordsService.updateWord(this.neededWords[this.index].id, wordNew).subscribe((data: Word) => {
        if (data) {
          this.colLearned += 1;
        }
      });
    }
    if (this.index < this.neededWords.length - 1) {
      this.index += 1;
      this.findPicture(this.neededWords[this.index].word_or);
    } else {
      this.process = 2;
    }
  }

  findPicture(word) {
    this.wordsService.findPictureByWord(word).subscribe((data: any) => {
      this.urlPicture = data.results[0].urls.full;
    });
  }

}
