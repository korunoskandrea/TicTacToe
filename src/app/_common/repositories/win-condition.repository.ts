import { PlayerSign } from '../../player/utils/PlayerSign';

export abstract class WinConditionRepository {
  static readonly WIDTH: number = 3;
  static readonly HEIGHT: number = 3;

  public static winningPositions(board: (PlayerSign | null)[]): number[] {
    let result: number[];
    if (this._checkColumns(board).length !== 0) {
      result = this._checkColumns(board);
    } else if (this._checkRows(board).length !== 0) {
      result = this._checkRows(board);
    } else {
      result = this._checkDiagonals(board);
    }
    return result;
  }

  public static isTied(board: (PlayerSign | null)[]) {
    if (this.winningPositions(board).length !== 0) return false;
    return board.findIndex((value) => value === null) < 0;
  }

  private static _checkColumns(board: (PlayerSign | null)[]): number[] {
    let winningColumn: number[] = [];
    for (let i = 0; i < board.length; i += this.WIDTH) {
      if (board[i] === null) {
        // empty cell
        winningColumn = [];
      } else if (winningColumn.length === 0) {
        // first not empty cell
        winningColumn.push(i);
      } else if (board[i] === board[i - this.WIDTH]) {
        // 2 cells have the same symbol
        winningColumn.push(i);
      }
      if (winningColumn.length === 3) {
        // 3 cells have the same symbol
        return winningColumn;
      }
      if (i === 6 || i == 7) {
        i = (i % this.HEIGHT) + 1 - 3; // jump to a new column
        winningColumn = [];
      }
    }
    return [];
  }

  private static _checkRows(board: (PlayerSign | null)[]): number[] {
    let winningRow: number[] = [];
    for (let i: number = 0; i < board.length; i++) {
      if (i % this.WIDTH === 0) {
        // new line
        winningRow = [];
      }
      if (board[i] === null) {
        // empty cell
        winningRow = [];
      } else if (winningRow.length === 0) {
        // first not empty cell
        winningRow.push(i);
      } else if (board[i] === board[i - 1]) {
        // 2 cells have the same symbol
        winningRow.push(i);
      }
      if (winningRow.length === 3) {
        // 3 cells have the same symbol
        return winningRow;
      }
    }
    return [];
  }

  private static _checkLeftDiagonal(board: (PlayerSign | null)[]): number[] {
    const INCREMENT: number = this.WIDTH + 1; // 4
    let winningDiagonal: number[] = [0, 4, 8];
    for (let i: number = INCREMENT; i < board.length; i += INCREMENT) {
      if (board[i - INCREMENT] !== board[i] || board[i] === null) {
        return [];
      }
    }
    return winningDiagonal;
  }

  private static _checkRightDiagonal(board: (PlayerSign | null)[]): number[] {
    const INCREMENT: number = this.WIDTH - 1; // 2
    let winningDiagonal: number[] = [2, 4, 6];
    for (let i: number = INCREMENT * 2; i < board.length - 1; i += INCREMENT) {
      if (board[i - INCREMENT] !== board[i] || board[i] === null) {
        return [];
      }
    }
    return winningDiagonal;
  }

  private static _checkDiagonals(board: (PlayerSign | null)[]): number[] {
    const leftDiagonal = this._checkLeftDiagonal(board);
    const rightDiagonal = this._checkRightDiagonal(board);
    if (leftDiagonal.length !== 0) {
      return leftDiagonal;
    }
    return rightDiagonal;
  }
}
