import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Difficulty } from '../../player/utils/Difficulty';
import { DifficultyService } from './difficulty.service';

@Component({
  selector: 'app-difficulty-dialog',
  templateUrl: 'set-difficulty.component.html',
  styleUrls: ['set-difficulty.component.css'],
})
export class SetDifficultyComponent {
  readonly DIFFICULTIES: Difficulty[] = [
    Difficulty.SUPER_EASY,
    Difficulty.EASY,
    Difficulty.NORMAL,
    Difficulty.ABOVE_AVERAGE,
    Difficulty.CHALLENGING,
    Difficulty.HARD,
    Difficulty.EXTRA_HARD,
    Difficulty.EXTREME,
    Difficulty.IMPOSSIBLE,
  ];

  constructor(
    public dialogRef: MatDialogRef<SetDifficultyComponent>,
    public difficultyService: DifficultyService,
    @Inject(MAT_DIALOG_DATA) public data: number,
  ) {
    this.difficultyService.setDifficulty(this.DIFFICULTIES[this.data - 1]);
  }

  onSaveDifficulty(): void {
    const selectedDifficulty = this.DIFFICULTIES[this.data - 1];
    this.difficultyService.setDifficulty(selectedDifficulty);
    this.dialogRef.close();
  }
}
