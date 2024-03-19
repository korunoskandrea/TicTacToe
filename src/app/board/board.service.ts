import { Injectable } from '@angular/core';
import { PlayerSign } from '../player/utils/PlayerSign';
import { PlayerService } from '../player/player.service';
import { WinConditionRepository } from '../_common/repositories/win-condition.repository';
import { Observable, Subject } from 'rxjs';
import { AlgorithmRepository } from '../_common/repositories/algoritham.repository';
import { DifficultyService } from '../dialogs/sett-difficulty/difficulty.service';

@Injectable({ providedIn: 'root' })
export class BoardService {
  readonly WIDTH: number = 3;
  readonly HEIGHT: number = 3;
  timerInterval: any;
  private _time: number = 0;
  private _board: (PlayerSign | null)[] = Array(this.WIDTH * this.HEIGHT).fill(
    null,
  );
  private _boardChangeNotifier: Subject<(PlayerSign | null)[]> = new Subject<
    (PlayerSign | null)[]
  >();

  constructor(
    private _playerService: PlayerService,
    private _difficultyService: DifficultyService,
  ) {}

  startTimer(): void {
    this._time = 0;
    this.timerInterval = setInterval(() => {
      this._time++;
    }, 1000);
  }

  get time() {
    return this._time;
  }

  stopTimer(): void {
    clearInterval(this.timerInterval);
  }

  get board(): (PlayerSign | null)[] {
    return [...this._board];
  }

  getCoordinatesFromIndex(index: number): { x: number; y: number } {
    // y = i mod w
    // x = (i - y) / W
    const y: number = index % this.WIDTH;
    const x: number = (index - y) / this.WIDTH;

    return { x, y };
  }

  isSquareEmpty(index: number): boolean {
    return this._board[index] === null;
  }

  isGameOver(): boolean {
    return this.isTied || this.winner !== null;
  }

  get winner(): PlayerSign | null {
    const winningPositions = WinConditionRepository.winningPositions(
      this._board,
    );
    if (winningPositions.length === 0) return null;
    const firstWinningSquare = winningPositions[0];
    return this._board[firstWinningSquare];
  }

  get isTied() {
    return WinConditionRepository.isTied(this._board);
  }

  get winningPositions(): number[] {
    return WinConditionRepository.winningPositions(this._board);
  }

  get boardObservable(): Observable<(PlayerSign | null)[]> {
    return this._boardChangeNotifier.asObservable();
  }

  resetBoard() {
    for (let i = 0; i < this._board.length; i++) {
      this._board[i] = null;
    }
    this._boardChangeNotifier.next(this.board);
  }

  onSquareSelected(index: number, onGameOverCb: () => void) {
    if (this.isGameOver() || !this.isSquareEmpty(index)) return;

    if (
      this._playerService.currentPlayer!.sign ===
      this._playerService.humanPlayerSign
    ) {
      this._board[index] = this._playerService.currentPlayer!.sign;
      this._boardChangeNotifier.next(this.board);
      this._playerService.nextPlayer();
      this.preformComputerMove();
      this._playerService.nextPlayer();
    }

    if (this.isGameOver()) {
      this.stopTimer();
      onGameOverCb();
      return;
    }
  }

  preformComputerMove() {
    const possibleBoards = AlgorithmRepository.getPossibleBoards(
      this._board,
      this._playerService.computerPlayerSign,
    );
    let bestBoardIndex = 0;
    let bestValue = -10000;
    possibleBoards.forEach((board, index) => {
      const boardValue = AlgorithmRepository.minMaxAlfaBeta(
        board,
        this._difficultyService.difficultyDepth,
        this._playerService.computerPlayerSign,
        this._playerService.humanPlayerSign,
        this._playerService.humanPlayerSign,
        -100000,
        100000,
      );
      if (boardValue > bestValue) {
        bestValue = boardValue;
        bestBoardIndex = index;
      }
    });

    this._board = possibleBoards[bestBoardIndex];
    this._boardChangeNotifier.next(this.board);
  }
}
