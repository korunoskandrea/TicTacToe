import {Component, ViewChild} from "@angular/core";
import {PlayerSign} from "../player/PlayerSign";
import {PlayerService} from "../player/PlayerService";
import {WinConditionRepository} from "../_common/repositories/win-condition.repository";
import {GameOverDialog} from "../dialogs/game-over/game-over.dialog";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-board',
  templateUrl: 'board.component.html',
  styleUrl: 'board.component.css',
})

export class BoardComponent {
  readonly WIDTH: number = 3;
  readonly HEIGHT: number = 3;
  board: (PlayerSign | null)[] = Array(this.WIDTH * this.HEIGHT).fill(null);
  gameOver: boolean = false; // need this for the game over dialog
  constructor(private _playerService: PlayerService, private _dialog: MatDialog) {
  }

  getCoordinatesFromIndex(index: number): { x: number; y: number } {
    // y = i mod w
    // x = (i - y) / W
    const y: number = index % this.WIDTH;
    const x: number = (index - y) / this.WIDTH;

    return {x, y};
  }

  onSquareClicked(index: number): void {
    if (this.winningPositions
      .length !== 0 || this.board[index] !== null) return;
    this.board[index] = this._playerService.currentPlayer;
    this._playerService.nextPlayer();
    if (this.winner) {
      this.openGameOverDialog('100ms', '150ms');
    }
  }

  get currPlayer(): PlayerSign {
    return this._playerService.currentPlayer;
  }

  get winner(): PlayerSign | null {
    if(this.winningPositions.length !== 0){
      this.gameOver = true;
      if(this._playerService.currentPlayer === PlayerSign.X) {
        return PlayerSign.O;
      } else {
        return  PlayerSign.X;
      }
    } else{
      return null;
    }
  }

  openGameOverDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this._dialog.open(GameOverDialog, {
      width: '300px',
      data: this.winner,
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  get winningPositions(): number[] {
    return WinConditionRepository.winningPositions(this.board);
  }

  isWinningPosition(index: number): boolean {
    return this.winningPositions.includes(index);
  }
}
