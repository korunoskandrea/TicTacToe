import { PlayerSign } from '../../player/utils/PlayerSign';
import { WinConditionRepository } from './win-condition.repository';
import { HeuristicRepository } from './heuristic.repository';

type Board = (PlayerSign | null)[];

export abstract class AlgorithmRepository {
  public static minMax(
    board: Board,
    depth: number,
    maxPlayerSign: PlayerSign,
    minPlayerSign: PlayerSign,
    currentPlayer: PlayerSign,
  ): number {
    if (
      WinConditionRepository.isTied(board) ||
      WinConditionRepository.winningPositions(board).length !== 0 ||
      depth <= 0
    ) {
      return HeuristicRepository.getGameStateHeuristic(
        board,
        maxPlayerSign,
        minPlayerSign,
      );
    }
    if (currentPlayer === maxPlayerSign) {
      let value: number = -10000000; // very low value and iterating through possible moves for the maximizing player
      for (let possibleBoard of this.getPossibleBoards(board, maxPlayerSign)) {
        value = Math.max(
          value,
          this.minMax(
            possibleBoard,
            depth - 1,
            maxPlayerSign,
            minPlayerSign,
            minPlayerSign,
          ),
        );
      }
      return value;
    } else {
      let value: number = 10000000; // very high value iterating through possible moves for the minimizing player
      for (let possibleBoard of this.getPossibleBoards(board, minPlayerSign)) {
        value = Math.min(
          value,
          this.minMax(
            possibleBoard,
            depth - 1,
            maxPlayerSign,
            minPlayerSign,
            maxPlayerSign,
          ),
        );
      }
      return value;
    }
  }

  public static getPossibleBoards(
    currentBoard: Board,
    sign: PlayerSign,
  ): Board[] {
    const boards: Board[] = [];
    currentBoard.forEach((playerSign, index) => {
      if (playerSign === null) {
        // empty cell
        const possibleBoard = [...currentBoard];
        possibleBoard[index] = sign;
        boards.push(possibleBoard);
      }
    });
    return boards;
  }

  public static minMaxAlfaBeta(
    board: Board,
    depth: number,
    maxPlayerSign: PlayerSign,
    minPlayerSign: PlayerSign,
    currentPlayer: PlayerSign,
    alfa: number,
    beta: number,
  ): number {
    if (
      WinConditionRepository.isTied(board) ||
      WinConditionRepository.winningPositions(board).length !== 0 ||
      depth <= 0
    ) {
      return HeuristicRepository.getGameStateHeuristic(
        board,
        maxPlayerSign,
        minPlayerSign,
      );
    }
    if (currentPlayer === maxPlayerSign) {
      let value: number = -1000000; // very low value and iterating through possible moves for the maximizing player
      for (let possibleBoard of this.getPossibleBoards(board, maxPlayerSign)) {
        value = Math.max(
          value,
          this.minMaxAlfaBeta(
            possibleBoard,
            depth - 1,
            maxPlayerSign,
            minPlayerSign,
            minPlayerSign,
            alfa,
            beta,
          ),
        );
        alfa = Math.max(alfa, value);
        if (value >= beta) {
          // Prune the subtree if the current value is greater than or equal to beta
          break;
        }
      }
      return value;
    } else {
      let value: number = 1000000; // very high value iterating through possible moves for the minimizing player
      for (let possibleBoard of this.getPossibleBoards(board, minPlayerSign)) {
        value = Math.min(
          value,
          this.minMaxAlfaBeta(
            possibleBoard,
            depth - 1,
            maxPlayerSign,
            minPlayerSign,
            maxPlayerSign,
            alfa,
            beta,
          ),
        );
        beta = Math.min(beta, value);
        if (value <= alfa) {
          // Prune the subtree if the current value is less than or equal to alpha
          break;
        }
      }
      return value;
    }
  }
}
