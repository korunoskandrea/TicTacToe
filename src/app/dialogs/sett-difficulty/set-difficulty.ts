import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Difficulty } from '../../player/utils/Difficulty';

@Component({
  selector: 'app-difficulty-dialog',
  templateUrl: 'set-difficulty.html',
  styleUrl: 'set-difficulty.css',
})
export class SetDifficulty {
  constructor(
    public dialogRef: MatDialogRef<SetDifficulty>,
    @Inject(MAT_DIALOG_DATA)
    public difficulty: Difficulty,
  ) {}

  //todo finish this
}
