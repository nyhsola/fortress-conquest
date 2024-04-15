import { BaseFormation } from "game/BaseFormation"
import { Footman, FOOTMAN_STATE } from "game/Footman"
import { Player } from "game/Player"

export enum FOOTMAN_ORDER {
  DEFEND,
}

export class FootmanBehaviour {
  private readonly player: Player
  private readonly orders: Array<FOOTMAN_ORDER> = []
  private readonly freePositions: Array<number> = []

  constructor(player: Player) {
    this.player = player
    this.addOrder(FOOTMAN_ORDER.DEFEND)
    Object.keys(BaseFormation.FOOTMAN_DEF).forEach((it) => this.freePositions.push(parseInt(it)))
  }

  public addOrder(order: FOOTMAN_ORDER) {
    this.orders.push(order)
  }

  public updateState(footmans: Array<Footman>) {
    for (const footman of footmans) {
      switch (footman.getState()) {
        case FOOTMAN_STATE.FREE:
          this.onDefendOrder(footman)
          break
      }
    }
  }

  private onDefendOrder(footman: Footman) {
    const point = this.player.getCastle()?.getPoint()
    const direction = this.player.getDirection()
    const position = this.freePositions.pop()
    const defPoint = position && point && direction && BaseFormation.FOOTMAN_DEF[position](point, direction)
    const location = defPoint && Location(defPoint?.x, defPoint?.y)
    location && footman.orderPoint(location)
  }
}
