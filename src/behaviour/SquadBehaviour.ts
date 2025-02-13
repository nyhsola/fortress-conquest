import { FOOTMAN_ORDER, FootmanBehaviour } from "./FootmanBehaviour"
import { GamePlayer } from "game/GamePlayer"
import { Squad } from "game/Squad"

export enum SQUAD_ORDER {
  DEFEND_CASTLE,
  PREPARE_FOR_ATTACK,
}

export class SquadBehaviour {
  private readonly player: GamePlayer
  private readonly footmanBehaviour: FootmanBehaviour

  constructor(player: GamePlayer) {
    this.player = player
    this.footmanBehaviour = new FootmanBehaviour(player)
  }

  public updateState(squads: Array<Squad>) {
    squads.forEach((it) => this.proceedSquad(it))
  }

  private proceedSquad(squad: Squad) {
    if (squad.isSquadReady()) {
      switch (squad.getOrders().shift()) {
        case SQUAD_ORDER.DEFEND_CASTLE:
          squad.getFootmans().forEach((footman) => footman.addOrder(FOOTMAN_ORDER.DEFEND_CASTLE))
          break
        case SQUAD_ORDER.PREPARE_FOR_ATTACK:
          squad.getFootmans().forEach((footman) => footman.addOrder(FOOTMAN_ORDER.PREPARE_FOR_ATTACK))
          break
      }
    }

    squad.getFootmans().forEach((footman) => this.footmanBehaviour.updateState(footman))
  }
}
