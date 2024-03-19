import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BoardSquareComponent } from './board/board-square/board-square.component';
import { BoardComponent } from './board/board.component';
import {
  MatButtonToggle,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { GameOverDialog } from './dialogs/game-over/game-over.dialog';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ChoosePlayerComponent } from './player/choose-player/choose-player.component';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatDivider } from '@angular/material/divider';
import { ResultsComponent } from './player/results/results.component';
import { PlayerTypePipe } from './_common/pipes/player-type.pipe';
import { MatTable } from '@angular/material/table';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { SetDifficultyComponent } from './dialogs/set-difficulty/set-difficulty.component';
import { MatFormField } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    BoardSquareComponent,
    BoardComponent,
    GameOverDialog,
    ChoosePlayerComponent,
    ResultsComponent,
    SetDifficultyComponent,
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
    MatDialogTitle,
    MatFabButton,
    MatGridList,
    MatGridTile,
    MatDivider,
    PlayerTypePipe,
    MatTable,
    MatSlider,
    FormsModule,
    MatSliderThumb,
    MatFormField,
    MatSelect,
    MatOption,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
