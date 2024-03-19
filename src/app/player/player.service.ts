import { PlayerSign } from './utils/PlayerSign';
import { Injectable } from '@angular/core';
import { Player, PlayerType } from './results/Player';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  // Responsible for the user
  private _humanPlayer: Player | null = null;
  private _computerPlayer: Player | null = null;
  private _isHuman: boolean = true;

  get currentPlayer(): Player | null {
    if (this._isHuman) return this._humanPlayer;
    return this._computerPlayer;
  }

  setHumanPlayer(player: PlayerSign) {
    this._humanPlayer = new Player(player, PlayerType.HUMAN);
    this._computerPlayer = new Player(
      this._humanPlayer.oppositeSign,
      PlayerType.COMPUTER,
    );
  }

  nextPlayer(): void {
    this._isHuman = !this._isHuman;
  }

  get computerPlayerSign(): PlayerSign {
    return this._computerPlayer!.sign;
  }

  get humanPlayerSign(): PlayerSign {
    return this._humanPlayer!.sign;
  }

  switchSignsForNewGame() {
    this._humanPlayer?.switchSign();
    this._computerPlayer?.switchSign();
    this._isHuman = true;
  }
}
