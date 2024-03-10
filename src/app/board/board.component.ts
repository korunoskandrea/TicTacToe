import {Component, inject, ViewChild} from "@angular/core";
import {PlayerSign} from "../player/utils/PlayerSign";
import {PlayerService} from "../player/player.service";
import {WinConditionRepository} from "../_common/repositories/win-condition.repository";
import {GameOverDialog} from "../dialogs/game-over/game-over.dialog";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";


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
  timer: number = 0; // Timer property
  timerInterval: any; // Interval variable
  constructor(private _playerService: PlayerService, private _dialog: MatDialog,private _router:Router) {
    this.startTimer(); // Start the timer when the game starts
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timer++;
    }, 1000); // Increment timer every second
  }

  // Function to stop the timer
  stopTimer() {
    clearInterval(this.timerInterval);
  }
  getCoordinatesFromIndex(index: number): { x: number; y: number } {
    // y = i mod w
    // x = (i - y) / W
    const y: number = index % this.WIDTH;
    const x: number = (index - y) / this.WIDTH;

    return {x, y};
  }

  onSquareClicked(index: number): void {
    if (this.winningPositions.length !== 0 || this.board[index] !== null) return;
    this.board[index] = this._playerService.currentPlayer;
    this._playerService.nextPlayer();
    if (this.winner) {
      this.stopTimer(); // Stop the timer when the game is over
      console.log(this.timer);
      this.openGameOverDialog('100ms', '150ms');
    }
  }

  get currPlayer(): PlayerSign | null {
    return this._playerService.currentPlayer;
  }

  get winner(): PlayerSign | null {
    if(this.winningPositions.length !== 0 || WinConditionRepository.isTied(this.board)){
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
    if(this.winningPositions.length!==0){
      const dialogRef = this._dialog.open(GameOverDialog, {
        width: '500px',
        data: {
          winner: this.winner,
          timer: this.timer
        },
        enterAnimationDuration,
        exitAnimationDuration,
      });
    } else if (WinConditionRepository.isTied(this.board)){
      const dialogRef = this._dialog.open(GameOverDialog, {
        width: '500px',
        data: {
          winner: null,
          timer: this.timer
        },
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
  }

  get winningPositions(): number[] {
    return WinConditionRepository.winningPositions(this.board);
  }

  isWinningPosition(index: number): boolean {
    return this.winningPositions.includes(index);
  }


}
