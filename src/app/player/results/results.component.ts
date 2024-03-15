import { Component, OnInit } from '@angular/core';
import { PlayerSign } from '../utils/PlayerSign';
import { ResultsService } from './results.service';
import { GameResultType } from './Player';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  private _winner: PlayerSign | null = null;
  private _gameResult: any;

  constructor(
    public resultsService: ResultsService,
    private _router: Router,
  ) {}

  ngOnInit(): void {}

  onBackClicked() {
    return this._router.navigate(['game']);
  }

  protected readonly GameResultType = GameResultType;
}
