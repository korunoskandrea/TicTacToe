import {Component, Input} from "@angular/core";
import {PlayerSign} from "../../player/utils/PlayerSign";

@Component({
  selector: 'app-board-square',
  templateUrl: 'board-square.component.html',
  styleUrl: 'board-square.component.css',
})

export class BoardSquareComponent {
  @Input() value!: PlayerSign.X | PlayerSign.O | null;
  @Input() isWinningPosition: boolean = false;
}
