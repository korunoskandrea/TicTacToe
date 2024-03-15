import { PlayerSign } from '../utils/PlayerSign';

export enum GameResultType {
  WIN,
  LOSS,
  TIE,
}

export enum PlayerType {
  HUMAN,
  COMPUTER,
}

export interface GameResult {
  resultType: GameResultType;
  sign: PlayerSign | null;
  playerType: PlayerType;
}

export class Player {
  constructor(
    private _sign: PlayerSign,
    private _type: PlayerType,
  ) {}

  public switchSign(): PlayerSign {
    if (this._sign === PlayerSign.O) {
      this._sign = PlayerSign.X;
    } else {
      this._sign = PlayerSign.O;
    }
    return this._sign;
  }

  get oppositeSign(): PlayerSign {
    if (this._sign === PlayerSign.O) {
      return PlayerSign.X;
    }
    return PlayerSign.O;
  }

  get sign(): PlayerSign {
    return this._sign;
  }

  get type(): PlayerType {
    return this._type;
  }
}
