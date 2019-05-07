import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SystemComponent} from './system.component';
import {ProfileComponent} from './profile/profile.component';
import {AudioComponent} from './audio/audio.component';
import {CardsComponent} from './cards/cards.component';
import {DictionaryComponent} from './dictionary/dictionary.component';
import {TestComponent} from './test/test.component';
import {AssociationComponent} from './association/association.component';

const routes: Routes = [
  {
    path: 'system', component: SystemComponent, children: [
      {path: 'profile', component: ProfileComponent},
      {path: 'audio', component: AudioComponent},
      {path: 'cards', component: CardsComponent},
      {path: 'association', component: AssociationComponent},
      {path: 'dictionary', component: DictionaryComponent},
      {path: 'test', component: TestComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemRoutingModule {}
