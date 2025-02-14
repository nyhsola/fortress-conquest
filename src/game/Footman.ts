import { Point, Unit } from "w3ts"

import { FOOTMAN_ORDER } from "behaviour/FootmanBehaviour"
import { UNIT } from "global/Config"
import { createUnitAtPoint, issuePointOrder } from "util/CommonUtil"

export enum FOOTMAN_STATE {
  CREATED,
  PREPARE_FOR_ATTACK,
  PREPARE,
  ATTACK,
  DEFEND,
  WAITING,
}

export class Footman {
  private readonly footman: Unit | undefined
  private orders: Array<FOOTMAN_ORDER> = []
  private index: number = 0

  public state: FOOTMAN_STATE = FOOTMAN_STATE.CREATED

  constructor(point: Point, allyId: number) {
    this.footman = createUnitAtPoint(point, allyId, UNIT.FOOTMAN)
  }

  public removeGuardPosition() {
    const unit = this.footman?.handle
    unit && RemoveGuardPosition(unit)
  }

  public orderMove(location: location) {
    this.footman && issuePointOrder(this.footman, "move", location)
  }

  public orderAttack(location: location) {
    this.footman && issuePointOrder(this.footman, "attack", location)
  }

  public getOrders = () => this.orders

  public addOrder = (order: FOOTMAN_ORDER) => this.orders.push(order)

  public getIndex = () => this.index

  public setIndex = (index: number) => (this.index = index)

  public isWaiting = () => this.state == FOOTMAN_STATE.WAITING && !this.isBusy()

  public isBusy = () => !(this.footman?.currentOrder == 0 && this.orders.length == 0)

  public isDead = () => this.footman?.isAlive() == false
}
