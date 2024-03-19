import { Component } from '@angular/core';
import { PlayerSign } from '../utils/PlayerSign';
import { Router } from '@angular/router';
import { PlayerService } from '../player.service';
import { Difficulty } from '../utils/Difficulty';
import { SetDifficulty } from '../../dialogs/sett-difficulty/set-difficulty';
import { MatDialog } from '@angular/material/dialog';
import { DifficultyService } from '../../dialogs/sett-difficulty/difficulty.service';

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

  setDifficulty(difficulty: Difficulty) {
    this._dialog.open(SetDifficulty, {
      data: this._difficultyService.difficulty,
    });
  }

  // todo set difficulty save stanje

  protected readonly PlayerSign = PlayerSign;
  protected readonly Difficulty = Difficulty;
}
