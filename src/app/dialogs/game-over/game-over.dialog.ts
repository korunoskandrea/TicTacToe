import { Component, Inject } from '@angular/core';
import { PlayerSign } from '../../player/utils/PlayerSign';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PlayerService } from '../../player/player.service';
import { BoardService } from '../../board/board.service';
import { ResultsService } from '../../player/results/results.service';

@Component({
  selector: 'app-dialogs',
  templateUrl: 'game-over.dialog.html',
  styleUrl: 'game-over.dialog.css',
})
export class GameOverDialog {
  constructor(
    public dialogRef: MatDialogRef<GameOverDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: { winner: PlayerSign | null; timer: number },
    private _router: Router,
    private _playerService: PlayerService,
    private _boardService: BoardService,
    private _resultsService: ResultsService,
  ) {}

  onNewGameClicked() {
    this._boardService.startTimer();
    this._playerService.switchSignsForNewGame();
    this._boardService.resetBoard();
    this.dialogRef.close();
  }

  onSeeResultClicked() {
    this.dialogRef.close();
    this._resultsService.saveResults();
    return this._router.navigate(['results']);
  }
}
