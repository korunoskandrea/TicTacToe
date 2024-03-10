import {PlayerSign} from "./utils/PlayerSign";
import {Observable, Subject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: "root" })
export class PlayerService{
  private _currentPlayer: PlayerSign | null = null;
  private _currentPlayerChangeNotifier: Subject<PlayerSign> = new Subject<PlayerSign>();

  get currentPlayer(): PlayerSign | null {
    return this._currentPlayer;
  }

  get currentPlayerObserver(): Observable<PlayerSign> {
    return this._currentPlayerChangeNotifier.asObservable();
  }

  setCurrentPlayer(player: PlayerSign) {
    this._currentPlayer = player;
    this._currentPlayerChangeNotifier.next(this._currentPlayer);
  }

  nextPlayer(): void {
    if (this._currentPlayer === PlayerSign.X) {
      this._currentPlayer = PlayerSign.O;
    } else {
      this._currentPlayer = PlayerSign.X;
    }
    this._currentPlayerChangeNotifier.next(this._currentPlayer);
  }
}
