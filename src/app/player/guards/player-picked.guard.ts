import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject, Injectable} from "@angular/core";
import {PlayerService} from "../player.service";

export const playerIsPickedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const playerIsPicked = inject(PlayerService).currentPlayer !== null;
  if (!playerIsPicked) {
    return inject(Router).navigate(['choose-player']);
  }
  return true;
}


