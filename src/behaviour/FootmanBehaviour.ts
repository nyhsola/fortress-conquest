import { BaseFormation } from "game/BaseFormation"
import { Footman, FOOTMAN_STATE } from "game/Footman"
import { GamePlayer } from "game/GamePlayer"

export enum FOOTMAN_ORDER {
  DEFEND,
  WAR,
}

enum GLOBAL_ORDER {
  RESET,
}

export class FootmanBehaviour {
  private readonly player: GamePlayer
  private readonly globalOrders: Array<GLOBAL_ORDER> = []
  private readonly orders: Array<FOOTMAN_ORDER> = []
  private readonly freePositions: Array<number> = []

  constructor(player: GamePlayer) {
    this.player = player
    Object.keys(BaseFormation.FOOTMAN_DEF).forEach((it) => this.freePositions.push(parseInt(it)))
  }

  public addOrder(order: FOOTMAN_ORDER, count: number) {
    this.orders.length = 0
    this.globalOrders.push(GLOBAL_ORDER.RESET)
    for (let i = 0; i < count; i++) {
      this.orders.push(order)
    }
  }

  public updateState(footmans: Array<Footman>) {
    switch (this.globalOrders.shift()) {
      case GLOBAL_ORDER.RESET:
        this.freePositions.length = 0
        Object.keys(BaseFormation.FOOTMAN_DEF).forEach((it) => this.freePositions.push(parseInt(it)))
        footmans.forEach((it) => it.resetState())
    }

    for (const footman of footmans) {
      switch (footman.getState()) {
        case FOOTMAN_STATE.LOCKED:
          this.proceedOrder(footman)
          break
      }
    }

    if (this.orders.length > 0) {
      footmans
        .filter((footman, index) => footman.getState() == FOOTMAN_STATE.FREE)
        .slice(0, this.orders.length)
        .forEach((footman) => footman.lockFootman())
    }
  }

  private proceedOrder(footman: Footman): boolean {
    if (this.orders.length <= 0) return false

    switch (this.orders.shift()) {
      case FOOTMAN_ORDER.DEFEND:
        this.onDefendOrder(footman)
        break
      case FOOTMAN_ORDER.WAR:
        this.onWarOrder(footman)
        break
    }

    return true
  }

  private onDefendOrder(footman: Footman) {
    const point = this.player.getCastle()?.getPoint()
    const direction = this.player.getDirection()
    const position = this.freePositions.pop()
    const defPoint = position && point && direction && BaseFormation.FOOTMAN_DEF[position](point, direction)
    const location = defPoint && Location(defPoint?.x, defPoint?.y)
    location && footman.orderDefPoint(location)
  }

  private onWarOrder(footman: Footman) {
    const point = this.player.getWarPoint()
    const direction = this.player.getDirection()
    const position = this.freePositions.pop()
    const defPoint = position && point && direction && BaseFormation.FOOTMAN_DEF[position](point, direction)
    const location = defPoint && Location(defPoint?.x, defPoint?.y)
    location && footman.orderWarPoint(location)
  }
}
