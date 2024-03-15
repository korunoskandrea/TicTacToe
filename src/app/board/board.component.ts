import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlayerSign } from '../player/utils/PlayerSign';
import { PlayerService } from '../player/player.service';
import { GameOverDialog } from '../dialogs/game-over/game-over.dialog';
import { MatDialog } from '@angular/material/dialog';
import { GameResultType, Player } from '../player/results/Player';
import { BoardService } from './board.service';
import { Subscription } from 'rxjs';
import { ResultsService } from '../player/results/results.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: 'board.component.html',
  styleUrl: 'board.component.css',
})
export class BoardComponent implements OnInit, OnDestroy {
  readonly WIDTH: number = 3;
  readonly HEIGHT: number = 3;
  private _boardSubscription?: Subscription;
  player!: Player;
  board: (PlayerSign | null)[] = [];

  constructor(
    private _boardService: BoardService,
    private _playerService: PlayerService,
    private _resultService: ResultsService,
    private _dialog: MatDialog,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.board = this._boardService.board;
    this._boardSubscription = this._boardService.boardObservable.subscribe(
      (board) => (this.board = board),
    );
    this._boardService.startTimer();
  }

  ngOnDestroy() {
    this._boardSubscription?.unsubscribe();
  }

  getCoordinates(index: number): { x: number; y: number } {
    return this._boardService.getCoordinatesFromIndex(index);
  }

  onSquareClicked(index: number): void {
    this._boardService.onSquareSelected(index, () =>
      this.openGameOverDialog('100ms', '100ms'),
    );
  }

  get currPlayer(): PlayerSign | null {
    return this._playerService.currentPlayer!.sign;
  }

  get time(): number {
    return this._boardService.time;
  }

  openGameOverDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    if (this._boardService.winner !== null) {
      this._resultService.addResult({
        resultType: GameResultType.WIN,
        sign: this._boardService.winner,
        playerType: this._playerService.currentPlayer!.type,
      });
      const dialogRef = this._dialog.open(GameOverDialog, {
        width: '500px',
        data: {
          winner: this._boardService.winner,
          timer: this._boardService.time,
        },
        disableClose: true,
        enterAnimationDuration,
        exitAnimationDuration,
      });
    } else if (this._boardService.isTied) {
      this._resultService.addResult({
        resultType: GameResultType.TIE,
        sign: null,
        playerType: this._playerService.currentPlayer!.type,
      });
      const dialogRef = this._dialog.open(GameOverDialog, {
        width: '500px',
        data: {
          winner: null,
          timer: this._boardService.time,
        },
        disableClose: true,
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
  }

  isWinningPosition(index: number): boolean {
    return this._boardService.winningPositions.includes(index);
  }

  onChooseSignClicked() {
    this._boardService.resetBoard();
    return this._router.navigate(['choose-player']);
  }

  onSeeResultsClicked() {
    return this._router.navigate(['results']);
  }
}
