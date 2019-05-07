import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemComponent } from './system.component';
import { TestComponent } from './test/test.component';
import { AudioComponent } from './audio/audio.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { CardsComponent } from './cards/cards.component';
import { AssociationComponent } from './association/association.component';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import {SharedModule} from '../shared/shared.module';
import {SystemRoutingModule} from './system-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TestService} from './shared/services/test.service';
import {CategoryService} from './shared/services/category.service';
import {MethodicService} from './shared/services/methodic.service';
import {QuestionService} from './shared/services/question.service';
import {WordService} from './shared/services/word.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ChartsModule} from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    ChartsModule
  ],
  declarations: [
    SystemComponent,
    TestComponent,
    AudioComponent,
    DictionaryComponent,
    CardsComponent,
    AssociationComponent,
    ProfileComponent,
    HeaderComponent,
    MenuComponent
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    TestService,
    CategoryService,
    MethodicService,
    QuestionService,
    WordService
  ]
})
export class SystemModule { }
