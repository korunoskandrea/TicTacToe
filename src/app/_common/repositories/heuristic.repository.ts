import { PlayerSign } from '../../player/utils/PlayerSign';
import { WinConditionRepository } from './win-condition.repository';

export abstract class HeuristicRepository {
  public static getGameStateHeuristic(
    board: (PlayerSign | null)[],
    maxPlayer: PlayerSign,
    minPlayer: PlayerSign,
  ) {
    let winPositions = WinConditionRepository.winningPositions(board);

    if (winPositions.length !== 0) {
      return board[winPositions[0]] === maxPlayer ? 100 : -100; // exp. 100 -> maxPlayer is winner
    }

    if (WinConditionRepository.isTied(board)) return 0;

    return (
      // difference between the heuristic values of the max and min players
      this._getPlayerHeuristic(board, maxPlayer) -
      this._getPlayerHeuristic(board, minPlayer)
    );
  }

  private static _getPlayerHeuristic(
    board: (PlayerSign | null)[],
    playerSign: PlayerSign,
  ) {
    return (
      this._getAvailableColumns(board, playerSign) +
      this._getAvailableRows(board, playerSign) +
      this._getAvailableDiagonal(board, playerSign)
    );
  }

  private static _getAvailableColumns(
    board: (PlayerSign | null)[],
    playerSign: PlayerSign,
  ): number {
    const COLUMN_INDICES = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];
    let availableColumns = 3;

    // checking each column for availability
    for (let column of COLUMN_INDICES) {
      for (let colIndex of column) {
        if (board[colIndex] !== null && board[colIndex] !== playerSign) {
          availableColumns--;
          break;
        }
      }
    }
    return availableColumns;
  }

  private static _getAvailableRows(
    board: (PlayerSign | null)[],
    playerSign: PlayerSign,
  ): number {
    const ROWS_INDICES = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];
    let availableRows = 3;

    // Checking each row for availability
    for (let row of ROWS_INDICES) {
      for (let rowIndex of row) {
        if (board[rowIndex] !== null && board[rowIndex] !== playerSign) {
          availableRows--;
          break;
        }
      }
    }
    return availableRows;
  }

  private static _getAvailableDiagonal(
    board: (PlayerSign | null)[],
    playerSign: PlayerSign,
  ): number {
    const DIAGONALS_INDICES = [
      [0, 4, 8],
      [2, 4, 6],
    ];
    let availableDiagonals = 2;

    // Checking each diagonal for availability
    for (let diagonal of DIAGONALS_INDICES) {
      for (let diagonalIndex of diagonal) {
        if (
          board[diagonalIndex] !== null &&
          board[diagonalIndex] !== playerSign
        ) {
          availableDiagonals--;
          break;
        }
      }
    }
    return availableDiagonals;
  }
}
