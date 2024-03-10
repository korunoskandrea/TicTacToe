import {Component, Inject} from "@angular/core";
import {PlayerSign} from "../../player/utils/PlayerSign";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BoardComponent} from "../../board/board.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dialogs',
  templateUrl: 'game-over.dialog.html',
  styleUrl: 'game-over.dialog.css',
})
export class GameOverDialog {
  constructor(
    public dialogRef: MatDialogRef<GameOverDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { winner: PlayerSign | null; timer: number },
    private _router:Router
  ) {
  }

  onNewGameClicked(){
    this.dialogRef.close();
    return this._router.navigate(['choose-player']);
  }

  OnSeeResultCliked(){
    // todo
  }

  protected readonly window = window;
}
