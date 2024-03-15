import { Injectable } from '@angular/core';
import { PlayerService } from '../player.service';
import { GameResult } from './Player';

@Injectable({ providedIn: 'root' })
export class ResultsService {
  private _results: GameResult[] = [];

  constructor(private _playerService: PlayerService) {
    const savedResults = localStorage.getItem('results');
    if (savedResults !== null) {
      this._results = JSON.parse(savedResults);
    }
  }

  addResult(result: GameResult) {
    this._results.push(result);
    this.saveResults();
  }

  saveResults(): void {
    localStorage.setItem('results', JSON.stringify(this._results));
  }

  get results(): GameResult[] {
    return [...this._results];
  }
}
