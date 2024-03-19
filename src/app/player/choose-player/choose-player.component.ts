import { Component } from '@angular/core';
import { PlayerSign } from '../utils/PlayerSign';
import { Router } from '@angular/router';
import { PlayerService } from '../player.service';
import { Difficulty } from '../utils/Difficulty';
import { SetDifficultyComponent } from '../../dialogs/set-difficulty/set-difficulty.component';
import { MatDialog } from '@angular/material/dialog';
import { DifficultyService } from '../../dialogs/set-difficulty/difficulty.service';

@Component({
  selector: 'app-choose-player',
  templateUrl: 'choose-player.component.html',
  styleUrl: 'choose-player.component.css',
})
export class ChoosePlayerComponent {
  constructor(
    private router: Router,
    private _playerService: PlayerService,
    private _dialog: MatDialog,
    private _difficultyService: DifficultyService,
  ) {}

  chooseSign(playerSign: PlayerSign): void {
    try {
      this._playerService.setHumanPlayer(playerSign);
      this.router.navigate(['/game']);
    } catch (error) {
      console.error('Error navigating to game screen:', error);
    }
  }

  setDifficulty(
    difficulty: Difficulty,
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    this._dialog.open(SetDifficultyComponent, {
      data: this._difficultyService.difficultyDepth,
      disableClose: true,
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  protected readonly PlayerSign = PlayerSign;
  protected readonly Difficulty = Difficulty;
}
