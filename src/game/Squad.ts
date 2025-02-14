import { Footman } from "./Footman"
import { GamePlayer } from "./GamePlayer"
import { FOOTMAN_ORDER } from "behaviour/FootmanBehaviour"
import { SQUAD_ORDER } from "behaviour/SquadBehaviour"
import { Positions } from "global/Positions"

export enum SQUAD_STATE {
  INITITAL,
  ATTACK,
  OPERATIONAL,
}

export class Squad {
  private readonly player: GamePlayer
  private readonly footmans: Array<Footman> = []
  private readonly positions: Array<number> = []
  private readonly ordersPool: Array<FOOTMAN_ORDER> = []
  private readonly orders: Array<SQUAD_ORDER> = []
  private squadCount: number

  public state: SQUAD_STATE = SQUAD_STATE.INITITAL

  constructor(player: GamePlayer, squadCount: number) {
    this.player = player
    this.squadCount = squadCount
    Object.keys(Positions.FOOTMAN_DEF).forEach((it) => this.positions.push(parseInt(it)))
  }

  public addOrder = (order: SQUAD_ORDER) => this.orders.push(order)

  public pushOrderForAll(order: FOOTMAN_ORDER) {
    for (let i = 0; i < this.squadCount; i++) {
      this.ordersPool.push(order)
    }
  }

  public getFootmans = () => this.footmans

  public getOrders = () => this.orders

  public getOrdersPool = () => this.ordersPool

  public isSquadFree = () => this.footmans.length < this.squadCount

  public isSquadReady = () => this.footmans.length == this.squadCount

  public isSquadBusy = () => this.isSquadReady() && this.footmans.some((it) => it.isBusy())

  public addUnit(footman: Footman) {
    this.footmans.push(footman)
    footman.addOrder(FOOTMAN_ORDER.PREPARE)
    footman.setIndex(this.footmans.length)
  }
}
