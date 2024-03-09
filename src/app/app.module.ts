import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {BoardSquareComponent} from "./board/board-square/board-square.component";
import {BoardComponent} from "./board/board.component";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {GameOverDialog} from "./dialogs/game-over/game-over.dialog";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {ChoosePlayerComponent} from "./player/choose-player/choose-player.component";

@NgModule({
  declarations: [
    AppComponent,
    BoardSquareComponent,
    BoardComponent,
    GameOverDialog,
    ChoosePlayerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonToggle,
    MatButtonToggleGroup,
    MatButton,
    MatCard,
    MatCardContent,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
