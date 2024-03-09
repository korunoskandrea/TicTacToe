import {Component, Input} from "@angular/core";
import {PlayerSign} from "../player/PlayerSign";

@Component({
  selector: 'app-square',
  templateUrl: 'square.component.html',
  styleUrl: 'square.component.css',
})

export class SquareComponent{
  @Input() value!: PlayerSign.X | PlayerSign.O | null;
}
