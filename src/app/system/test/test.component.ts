import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../shared/services/question.service';
import {TestService} from '../shared/services/test.service';
import {MethodicService} from '../shared/services/methodic.service';
import {Question} from '../../shared/models/question.model';
import {Methodic} from '../../shared/models/methodic.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { angularMath } from 'angular-ts-math';
import {Test} from '../../shared/models/test.model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less']
})
export class TestComponent implements OnInit {

  process: number;
  all_questions = [];
  needed_questions = [];
  all_methodics = [];
  index = 0;
  is_answering = 0;
  test_result = ['', '', '', '', '', ''];
  result1 = 0;
  result2 = 0;
  result3 = 0;
  timer: number;
  ticks = 0;
  words_sort = [];
  metod: Methodic;

  constructor(private questionService: QuestionService,
              private testService: TestService,
              private methodicsService: MethodicService) { }

  ngOnInit() {
    this.process = 0;
    this.questionService.getAllQuestions().subscribe((quests: Question[]) => {
      if (quests.length > 0) {
        this.all_questions = quests;
        this.all_questions.sort(this.compareRandom);
        this.needed_questions = this.all_questions.slice(0, 9);
      }
    });
    this.methodicsService.getAllMethodics().subscribe((mets: Methodic[]) => {
      if (mets.length > 0) {
        this.all_methodics = mets;
      }
    });
  }

  compareRandom(a, b) {
    return angularMath.getRandom() - 0.5;
  }

  goTest() {
    this.process = 1;
    this.doTicks();
    if (this.needed_questions[this.index].id_methodic !== 2) {
      this.words_sort = this.needed_questions[this.index].words.slice();
      this.words_sort.sort(this.compareRandom);
    }
  }

  nextQuest() {
    this.is_answering = 0;
    this.ticks = 0;
    if (this.needed_questions[this.index].id_methodic === 2) {
      this.resultsOfQuestEye();
    } else {
      this.resultsOfQuestNotEye();
    }
    if (this.index < 8) {
      this.index += 1;
      if (this.needed_questions[this.index].id_methodic !== 2) {
        this.words_sort = this.needed_questions[this.index].words.slice();
        this.words_sort.sort(this.compareRandom);
      }
    } else {
      this.process = 2;
      this.getAllResults();
    }
    this.test_result = ['', '', '', '', '', ''];
    this.doTicks();
  }

  nextPart() {
    this.is_answering = 1;
  }

  doTicks() {
    if (this.needed_questions[this.index].id_methodic === 2) {
      this.timer = setInterval(() => {
        if (this.ticks < 15) {
          this.ticks += 1;
        } else {
          clearInterval(this.timer);
          this.nextPart();
        }
      }, 1000);
    }
  }

  resultsOfQuestEye() {
    for (let i = 0; i < this.test_result.length / 2; i++) {
      if (this.test_result[i].toLowerCase() === this.needed_questions[this.index].words[(i * 2) + 1].toLowerCase()) {
        this.result2 += 1;
      }
    }
  }

  resultsOfQuestNotEye() {
    for (let i = 0; i < this.words_sort.length; i++) {
      if (this.needed_questions[this.index].words[i] === this.words_sort[i]) {
        if (this.needed_questions[this.index].id_methodic === 1) {
          this.result1 += 1;
        } else {
          this.result3 += 1;
        }
      }
    }
  }

  listenTo() {
    const word = this.needed_questions[this.index].words.join(',');
    const synth = window.speechSynthesis;
    const message = new SpeechSynthesisUtterance();
    message.lang = 'ru-RU';
    message.text = word;
    synth.speak(message);
  }

  getAllResults() {
    this.result3 /= 3;
    this.result2 /= 3;
    this.result1 /= 3;
    if (this.result1 > this.result2) {
      if (this.result1 > this.result3) {
        this.metod = this.all_methodics[0];
      } else {
        this.metod = this.all_methodics[2];
      }
    } else {
      if (this.result2 > this.result3) {
        this.metod = this.all_methodics[1];
      } else {
        this.metod = this.all_methodics[2];
      }
    }
    if (this.result3 === 0 && this.result1 === 0 && this.result2 === 0) {
      this.metod = null;
    }
    const user = JSON.parse(window.localStorage.getItem('user'));
    const test = new Test(user.id, this.metod.id, new Date());
    this.testService.addTest(test).subscribe(() => {});
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.words_sort, event.previousIndex, event.currentIndex);
  }
}
