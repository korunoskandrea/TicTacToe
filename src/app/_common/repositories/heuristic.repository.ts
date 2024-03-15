import {BoardService} from "../../board/board.service";
import {Player} from "../../player/results/Player";
import {PlayerSign} from "../../player/utils/PlayerSign";

export abstract class HeuristicRepository {

  private static _getPlayerHeuristic(board: (PlayerSign | null)[], playerSign: PlayerSign) {
    let availableColumns = 0;

  }

  private static _isPositionContainingPlayer(board: (PlayerSign | null)[], playerSign: PlayerSign) {
    for (let i: number = 0; i < board.length; i++) {
      if (board[i] === playerSign) {
        return true;
      }
    }
    return false;
  }

  public static getColumn(board: (PlayerSign | null)[], columnIndex: number): (PlayerSign | null)[] {
    let column: (PlayerSign | null)[] = [];
    for (let i: number = columnIndex; i < board.length; i += 3) {
      column.push(board[i]);
    }
    return column;
  }

  public static getLeftDiagonal(board: (PlayerSign | null)[]): (PlayerSign | null)[] {
    let diagonal: (PlayerSign | null)[] = [];
    diagonal.push(board[0]);
    diagonal.push(board[4]);
    diagonal.push(board[8]);
    return diagonal;
  }

  public static getRightDiagonal(board: (PlayerSign | null)[]): (PlayerSign | null)[] {
    let diagonal: (PlayerSign | null)[] = [];
    diagonal.push(board[2]);
    diagonal.push(board[4]);
    diagonal.push(board[6]);
    return diagonal;
  }
}
