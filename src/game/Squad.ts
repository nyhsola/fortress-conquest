import { Footman } from "./Footman"
import { GamePlayer } from "./GamePlayer"
import { FOOTMAN_ORDER } from "behaviour/FootmanBehaviour"
import { SQUAD_ORDER } from "behaviour/SquadBehaviour"
import { Positions } from "global/Positions"

const SQUAD_LIMIT = 6

export class Squad {
  private readonly player: GamePlayer
  private readonly footmans: Array<Footman> = []
  private readonly positions: Array<number> = []
  private readonly orders: Array<SQUAD_ORDER> = []

  constructor(player: GamePlayer) {
    this.player = player
    Object.keys(Positions.FOOTMAN_DEF).forEach((it) => this.positions.push(parseInt(it)))
  }

  public addOrder(order: SQUAD_ORDER) {
    this.orders.push(order)
  }

  public getFootmans = () => this.footmans

  public getOrders = () => this.orders

  public isSquadFree = () => this.footmans.length < SQUAD_LIMIT

  public isSquadReady = () => this.footmans.length == SQUAD_LIMIT

  public addUnit(footman: Footman) {
    this.footmans.push(footman)
    footman.addOrder(FOOTMAN_ORDER.GO_TO_BANNER)
    footman.setIndex(this.footmans.length)
  }
}
