import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BoardComponent} from "./board/board.component";
import {ChoosePlayerComponent} from "./player/choose-player/choose-player.component";

const routes: Routes = [
  { path: '', redirectTo: 'choose-player', pathMatch: "full"},
  { path: 'choose-player', component: ChoosePlayerComponent },
  { path: 'game', component: BoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
