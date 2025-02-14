import { FOOTMAN_ORDER, FootmanBehaviour } from "./FootmanBehaviour"
import { FOOTMAN_STATE } from "game/Footman"
import { GamePlayer } from "game/GamePlayer"
import { Squad, SQUAD_STATE } from "game/Squad"

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
    if (squad.getOrders().length != 0) {
      const order = squad.getOrders()[0]
      switch (squad.state) {
        case SQUAD_STATE.INITITAL:
          switch (order) {
            case SQUAD_ORDER.DEFEND_CASTLE:
              squad.pushOrderForAll(FOOTMAN_ORDER.DEFEND_CASTLE)
              squad.getOrders().shift()
              squad.state = SQUAD_STATE.INITITAL
              break
            case SQUAD_ORDER.PREPARE_FOR_ATTACK:
              squad.pushOrderForAll(FOOTMAN_ORDER.PREPARE_FOR_ATTACK)
              squad.getOrders().shift()
              squad.state = SQUAD_STATE.ATTACK
              squad.addOrder(SQUAD_ORDER.ATTACK_CASTLE)
              break
          }
          break
        case SQUAD_STATE.ATTACK:
          switch (order) {
            case SQUAD_ORDER.ATTACK_CASTLE:
              if (!squad.isSquadBusy()) {
                squad.pushOrderForAll(FOOTMAN_ORDER.ATTACK_CASTLE)
                squad.getOrders().shift()
                squad.state = SQUAD_STATE.OPERATIONAL
              }
              break
          }
          break
      }
    }

    squad.getFootmans().forEach((footman) => {
      if (squad.getOrdersPool().length != 0) {
        const currentOrder = squad.getOrdersPool()[0]
        switch (footman.state) {
          case FOOTMAN_STATE.WAITING:
            footman.addOrder(currentOrder)
            squad.getOrdersPool().shift()
            break
        }
      }
    })

    squad.getFootmans().forEach((footman) => this.footmanBehaviour.updateState(footman))
  }
}
