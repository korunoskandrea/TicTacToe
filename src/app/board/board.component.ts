import {Component} from "@angular/core";
import {PlayerSign} from "../player/PlayerSign";
import {PlayerService} from "../player/PlayerService";
import {WinConditionRepository} from "../_common/repositories/win-condition.repository";


@Component({
  selector: 'app-board',
  templateUrl: 'board.component.html',
  styleUrl: 'board.component.css',
})

export class BoardComponent {
  readonly WIDTH: number = 3;
  readonly HEIGHT: number = 3;

  constructor(private _playerService: PlayerService) {
  }


  board: (PlayerSign | null)[] = Array(this.WIDTH * this.HEIGHT).fill(null);

  getCoordinatesFromIndex(index: number): { x: number; y: number } {
    // y = i mod w
    // x = (i - y) / W
    const y: number = index % this.WIDTH;
    const x: number = (index - y) / this.WIDTH;

    return {x, y};
  }

  onSquareClicked(index: number): void {
    if (WinConditionRepository.isGameOver(this.board) || this.board[index] !== null) return;
    this.board[index] = this._playerService.currentPlayer;
    this._playerService.nextPlayer();
    console.log(WinConditionRepository.isGameOver(this.board));
    console.log(this.winner);
  }

  get currPlayer(): PlayerSign {
    return this._playerService.currentPlayer;
  }

  get winner(): PlayerSign | null {
    if(WinConditionRepository.isGameOver(this.board)){
      if(this._playerService.currentPlayer === PlayerSign.X) {
        return PlayerSign.O;
      } else {
        return  PlayerSign.X;
      }
    } else{
      return null;
    }
  }

}
