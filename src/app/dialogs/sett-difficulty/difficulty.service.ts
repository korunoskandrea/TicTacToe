import { Injectable } from '@angular/core';
import { Difficulty } from '../../player/utils/Difficulty';

@Injectable({ providedIn: 'root' })
export class DifficultyService {
  private _difficulty: Difficulty = Difficulty.EASY;

  public setDifficulty(difficulty: Difficulty) {
    this._difficulty = difficulty;
  }

  get difficulty() {
    return this._difficulty;
  }

  get difficultyDepth() {
    if (this._difficulty === Difficulty.SUPER_EASY) {
      return 1;
    } else if (this._difficulty === Difficulty.EASY) {
      return 2;
    } else if (this._difficulty === Difficulty.NORMAL) {
      return 3;
    } else if (this._difficulty === Difficulty.ABOVE_AVERAGE) {
      return 4;
    } else if (this._difficulty === Difficulty.CHALLENGING) {
      return 5;
    } else if (this._difficulty === Difficulty.HARD) {
      return 6;
    } else if (this._difficulty === Difficulty.EXTRA_HARD) {
      return 7;
    } else if (this._difficulty === Difficulty.EXTREME) {
      return 8;
    }
    return 9;
  }
}
