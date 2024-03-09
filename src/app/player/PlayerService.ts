import {PlayerSign} from "./PlayerSign";
import {Observable, Subject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: "root" })
export class PlayerService{
  private _currentPlayer: PlayerSign = PlayerSign.O;
  private _currentPlayerChangeNotifier: Subject<PlayerSign> = new Subject<PlayerSign>();

  get currentPlayer(): PlayerSign {
    return this._currentPlayer;
  }

  get currentPlayerObserver(): Observable<PlayerSign> {
    return this._currentPlayerChangeNotifier.asObservable();
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
