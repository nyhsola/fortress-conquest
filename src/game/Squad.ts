import { Footman } from "./Footman"
import { GamePlayer } from "./GamePlayer"
import { FOOTMAN_ORDER } from "behaviour/FootmanBehaviour"
import { Positions } from "global/Positions"

const SQUAD_LIMIT = 6

export class Squad {
  private readonly player: GamePlayer
  private readonly footmans: Array<Footman> = []
  private readonly orders: Array<FOOTMAN_ORDER> = []
  private readonly positions: Array<number> = []

  constructor(player: GamePlayer) {
    this.player = player
    Object.keys(Positions.FOOTMAN_DEF).forEach((it) => this.positions.push(parseInt(it)))
  }

  public setOrderForSquad(mode: FOOTMAN_ORDER) {
    switch (mode) {
      case FOOTMAN_ORDER.DEFEND:
        this.orders.length = 0
        for (let i = 0; i < SQUAD_LIMIT; i++) {
          this.orders.push(FOOTMAN_ORDER.DEFEND)
        }
        break
      case FOOTMAN_ORDER.WAR:
        this.orders.length = 0
        for (let i = 0; i < SQUAD_LIMIT; i++) {
          this.orders.push(FOOTMAN_ORDER.WAR)
        }
        break
    }
  }

  public getFootmans = () => this.footmans

  public getOrders = () => this.orders

  public isSquadFree = () => this.footmans.length < SQUAD_LIMIT

  public addUnit(footman: Footman) {
    this.onBannerOrder(footman)
    this.footmans.push(footman)
  }

  public proceedOrder(footman: Footman): boolean {
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

  public reset() {
    this.positions.length = 0
    Object.keys(Positions.FOOTMAN_DEF).forEach((it) => this.positions.push(parseInt(it)))
    this.footmans.forEach((it) => it.resetState())
  }

  private onDefendOrder(footman: Footman) {
    const point = this.player.getCastle()?.getPoint()
    const direction = this.player.getDirection()
    const position = this.positions.pop()
    const defPoint = position && point && direction && Positions.FOOTMAN_DEF[position](point, direction)
    const location = defPoint && Location(defPoint?.x, defPoint?.y)
    location && footman.orderMove(location)
  }

  private onWarOrder(footman: Footman) {
    const point = this.player.getAttackPoint(0)
    const location = Location(point?.x, point?.y)
    location && footman.orderMove(location)
  }

  private onBannerOrder(footman: Footman) {
    const point = this.player.getPoint()
    const direction = this.player.getDirection()
    const pointBanner = point && direction && Positions.BANNER(point, direction)
    pointBanner && footman.instantMove(Location(pointBanner.x, pointBanner.y))
  }
}
