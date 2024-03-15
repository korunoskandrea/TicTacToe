import { Pipe, PipeTransform } from '@angular/core';
import { PlayerType } from '../../player/results/Player';

@Pipe({
  standalone: true,
  name: 'playerType',
})
export class PlayerTypePipe implements PipeTransform {
  transform(playerType: PlayerType): string {
    if (playerType === PlayerType.HUMAN) return 'Human';
    return 'Computer';
  }
}
