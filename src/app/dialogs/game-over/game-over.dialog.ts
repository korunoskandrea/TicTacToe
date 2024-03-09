import {Component, Inject} from "@angular/core";
import {PlayerSign} from "../../player/PlayerSign";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialogs',
  templateUrl: 'game-over.dialog.html',
  styleUrl: 'game-over.dialog.css',
})
export class GameOverDialog {
  constructor(
    public dialogRef: MatDialogRef<GameOverDialog>,
    @Inject(MAT_DIALOG_DATA) public winner: PlayerSign,
  ) {}

}
