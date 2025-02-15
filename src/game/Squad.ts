import { Footman, FOOTMAN_ORDER, FOOTMAN_STATE } from "./Footman"
import { Positions } from "global/Positions"

export enum SQUAD_STATE {
  INITITAL,
  ATTACK,
  OPERATIONAL,
}

export enum SQUAD_ORDER {
  DEFEND_CASTLE,
  PREPARE_FOR_ATTACK,
  LOCK_FOR_ATTACK,
  ATTACK_CASTLE,
}

export class Squad {
  private readonly footmans: Array<Footman> = []
  private readonly positions: Array<number> = []
  private readonly ordersPool: Array<FOOTMAN_ORDER> = []
  private readonly orders: Array<SQUAD_ORDER> = []
  public squadCount: number = 0

  public state: SQUAD_STATE = SQUAD_STATE.INITITAL

  constructor(squadCount: number) {
    this.squadCount = squadCount
    Object.keys(Positions.FOOTMAN_DEF).forEach((it) => this.positions.push(parseInt(it)))
  }

  public addOrder = (order: SQUAD_ORDER) => this.orders.push(order)

  public getFootmans = () => this.footmans

  public isSquadFree = () => this.footmans.length < this.squadCount

  public isSquadFull = () => this.footmans.length == this.squadCount

  public isWaitingAttack = () => this.isSquadFull() && this.footmans.every((it) => it.isWaitingAttack())

  public isAllDead = () => this.isSquadFull() && this.footmans.every((it) => it.isDead())

  public addUnit(footman: Footman) {
    this.footmans.push(footman)
    footman.addOrder(FOOTMAN_ORDER.PREPARE)
    footman.setIndex(this.footmans.length)
  }

  public pushPoolOrder(order: FOOTMAN_ORDER) {
    for (let i = 0; i < this.squadCount; i++) {
      this.ordersPool.push(order)
    }
  }

  public pushImmediateOrder(order: FOOTMAN_ORDER) {
    for (let i = 0; i < this.footmans.length; i++) {
      this.footmans[i].addOrder(order)
    }
  }

  public updateState() {
    switch (this.state) {
      case SQUAD_STATE.INITITAL:
      case SQUAD_STATE.ATTACK:
        this.proceedOrder()
        break
    }

    this.footmans.forEach((footman) => this.proceedFootmanOrder(footman))
  }

  private proceedOrder() {
    if (this.orders.length != 0) {
      const order = this.orders[0]
      switch (order) {
        case SQUAD_ORDER.DEFEND_CASTLE:
          this.pushPoolOrder(FOOTMAN_ORDER.DEFEND_CASTLE)
          this.orders.shift()
          this.state = SQUAD_STATE.OPERATIONAL
          break
        case SQUAD_ORDER.PREPARE_FOR_ATTACK:
          this.pushPoolOrder(FOOTMAN_ORDER.PREPARE_FOR_ATTACK)
          this.orders.shift()
          this.state = SQUAD_STATE.ATTACK
          this.addOrder(SQUAD_ORDER.ATTACK_CASTLE)
          break
        case SQUAD_ORDER.ATTACK_CASTLE:
          if (this.isWaitingAttack()) {
            this.pushImmediateOrder(FOOTMAN_ORDER.ATTACK_CASTLE)
            this.orders.shift()
            this.state = SQUAD_STATE.OPERATIONAL
          }
          break
      }
    }
  }

  private proceedFootmanOrder(footman: Footman) {
    if (this.ordersPool.length != 0) {
      const currentOrder = this.ordersPool[0]
      switch (footman.state) {
        case FOOTMAN_STATE.WAITING:
          footman.addOrder(currentOrder)
          this.ordersPool.shift()
          break
      }
    }
  }
}
