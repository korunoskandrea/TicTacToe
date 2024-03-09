import {PlayerSign} from "../../player/PlayerSign";

export abstract class WinConditionRepository {
  static readonly WIDTH: number = 3;
  static readonly HEIGHT: number = 3;

  public static isGameOver(board: (PlayerSign | null)[]): boolean {
    return this._checkDiagonals(board) || this._checkRows(board) || this._checkColumns(board);
  }

  private static _checkColumns(board: (PlayerSign | null)[]): boolean {
    let counter: number = 0;
    for (let i = 0; i < board.length; i += this.WIDTH) {
      if (board[i] === null) { // empty cell
        counter = 0;
      } else if (counter === 0) { // first not empty cell
        counter++;
      } else if (board[i] === board[i - this.WIDTH]) { // 2 cells have the same symbol
        counter++;
      }
      if (counter === 3) { // 3 cells have the same symbol
        return true;
      }
      if (i === 6 || i == 7) {
        i = ((i % this.HEIGHT) + 1) - 3; // jump to a new column
        counter = 0;
      }
    }
    return false;
  }

  private static _checkRows(board: (PlayerSign | null)[]): boolean {
    let counter: number = 0;
    for (let i: number = 0; i < board.length; i++) {
      if (i % this.WIDTH === 0) { // new line
        counter = 0;
      }
      if (board[i] === null) { // empty cell
        counter = 0;
      } else if (counter === 0) { // first not empty cell
        counter++;
      } else if (board[i] === board[i - 1]) { // 2 cells have the same symbol
        counter++;
      }
      if (counter === 3) { // 3 cells have the same symbol
        return true;
      }
    }
    return false;
  }

  private static _checkLeftDiagonal(board: (PlayerSign | null)[]) {
    const INCREMENT: number = this.WIDTH + 1; // 4
    for (let i: number = INCREMENT; i < board.length; i += INCREMENT) {
      if (board[i - INCREMENT] !== board[i] || board[i] === null) {
        return false;
      }
    }
    return true;
  }

  private static _checkRightDiagonal(board: (PlayerSign | null)[]) {
    const INCREMENT: number = this.WIDTH - 1; // 2
    for (let i: number = INCREMENT * 2; i < board.length - 1; i += INCREMENT) {
      if (board[i - INCREMENT] !== board[i] || board[i] === null) {
        return false;
      }
    }
    return true;
  }
  private static _checkDiagonals(board: (PlayerSign | null)[]): boolean {
    return this._checkLeftDiagonal(board) || this._checkRightDiagonal(board);
  }
}
