import {Component} from "@angular/core";
import {PlayerSign} from "../utils/PlayerSign";
import {Router} from "@angular/router";
import {PlayerService} from "../player.service";

@Component({
  selector: 'app-choose-player',
  templateUrl: 'choose-player.component.html',
  styleUrl: 'choose-player.component.css',
})
export class ChoosePlayerComponent{
  constructor(private router: Router, private _playerService: PlayerService) {
  }
  chooseSign(playerSign: PlayerSign): void {
    localStorage.setItem('playerSign', playerSign);
    try {
      this._playerService.setCurrentPlayer(playerSign);
      this.router.navigate(['/game']);
    } catch (error) {
      console.error("Error navigating to game screen:", error);
    }
  }


  protected readonly PlayerSign = PlayerSign;
}
