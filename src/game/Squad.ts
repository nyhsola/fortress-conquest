import { Footman } from "./Footman"
import { GamePlayer } from "./GamePlayer"
import { FOOTMAN_ORDER } from "behaviour/FootmanBehaviour"
import { BaseFormation } from "global/BaseFormation"

const SQUAD_LIMIT = 6

export class Squad {
  private readonly player: GamePlayer
  private readonly footmans: Array<Footman> = []
  private readonly orders: Array<FOOTMAN_ORDER> = []
  private readonly positions: Array<number> = []

  constructor(player: GamePlayer) {
    this.player = player
    Object.keys(BaseFormation.FOOTMAN_DEF).forEach((it) => this.positions.push(parseInt(it)))

    this.orders.length = 0
    for (let i = 0; i < SQUAD_LIMIT; i++) {
      this.orders.push(FOOTMAN_ORDER.DEFEND)
    }
  }

  public getFootmans = () => this.footmans

  public getOrders = () => this.orders

  public isSquadFree(): boolean {
    return this.footmans.length < SQUAD_LIMIT
  }

  public addUnit(footman: Footman) {
    this.footmans.push(footman)
  }

  public reset() {
    this.positions.length = 0
    Object.keys(BaseFormation.FOOTMAN_DEF).forEach((it) => this.positions.push(parseInt(it)))
    this.footmans.forEach((it) => it.resetState())
  }

  public proceedOrder(footman: Footman): boolean {
    if (this.orders.length <= 0) return false
    switch (this.orders.shift()) {
      case FOOTMAN_ORDER.DEFEND:
        this.onDefendOrder(footman)
        break
      case FOOTMAN_ORDER.WAR:
        break
    }
    return true
  }

  private onDefendOrder(footman: Footman) {
    const point = this.player.getCastle()?.getPoint()
    const direction = this.player.getDirection()
    const position = this.positions.pop()
    const defPoint = position && point && direction && BaseFormation.FOOTMAN_DEF[position](point, direction)
    const location = defPoint && Location(defPoint?.x, defPoint?.y)
    location && footman.orderDefPoint(location)
  }
}
