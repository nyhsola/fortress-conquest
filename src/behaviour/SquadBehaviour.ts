import { FOOTMAN_ORDER, FootmanBehaviour } from "./FootmanBehaviour"
import { GamePlayer } from "game/GamePlayer"
import { Squad } from "game/Squad"

export enum SQUAD_ORDER {
  DEFEND_CASTLE,
  PREPARE_FOR_ATTACK,
  LOCK_FOR_ATTACK,
  ATTACK_CASTLE,
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
      const currentOrder = squad.getOrders().shift()
      switch (currentOrder) {
        case SQUAD_ORDER.DEFEND_CASTLE:
          squad.getFootmans().forEach((footman) => footman.addOrder(FOOTMAN_ORDER.DEFEND_CASTLE))
          break
        case SQUAD_ORDER.PREPARE_FOR_ATTACK:
          squad.getFootmans().forEach((footman) => footman.addOrder(FOOTMAN_ORDER.PREPARE_FOR_ATTACK))
          squad.addOrder(SQUAD_ORDER.LOCK_FOR_ATTACK)
          break
        case SQUAD_ORDER.LOCK_FOR_ATTACK:
          squad.addOrder(SQUAD_ORDER.ATTACK_CASTLE)
          break
        default:
          currentOrder && squad.returnOrder(currentOrder)
          break
      }
    }

    if (!squad.isSquadBusy()) {
      const currentOrder = squad.getOrders().shift()
      switch (currentOrder) {
        case SQUAD_ORDER.ATTACK_CASTLE:
          squad.getFootmans().forEach((footman) => footman.addOrder(FOOTMAN_ORDER.ATTACK_CASTLE))
          break
        default:
          currentOrder && squad.returnOrder(currentOrder)
          break
      }
    }

    squad.getFootmans().forEach((footman) => this.footmanBehaviour.updateState(footman))
  }
}
