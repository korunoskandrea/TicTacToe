import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BoardComponent} from "./board/board.component";
import {ChoosePlayerComponent} from "./player/choose-player/choose-player.component";
import {playerIsPickedGuard} from "./player/guards/player-picked.guard";
import {ResultsComponent} from "./player/results/results.component";

const routes: Routes = [
  { path: '', redirectTo: 'choose-player', pathMatch: "full"},
  { path: 'choose-player', component: ChoosePlayerComponent },
  { path: 'game', component: BoardComponent, canActivate: [ playerIsPickedGuard ] },
  { path: 'results', component: ResultsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
