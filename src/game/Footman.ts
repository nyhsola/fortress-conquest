import { Point, Unit } from "w3ts"

import { FOOTMAN_ORDER } from "behaviour/FootmanBehaviour"
import { UNIT } from "global/Config"
import { createUnitAtPoint, issuePointOrder } from "util/CommonUtil"

export class Footman {
  private readonly footman: Unit | undefined
  private orders: Array<FOOTMAN_ORDER> = []
  private index: number = 0

  constructor(point: Point, allyId: number) {
    this.footman = createUnitAtPoint(point, allyId, UNIT.FOOTMAN)
  }

  public instantMove(location: location) {
    const unit = this.footman?.handle
    unit && RemoveGuardPosition(unit)
    this.footman && issuePointOrder(this.footman, "move", location)
  }

  public orderMove(location: location) {
    this.footman && issuePointOrder(this.footman, "move", location)
  }

  public addOrder(order: FOOTMAN_ORDER) {
    this.orders.push(order)
  }

  public getIndex = () => this.index

  public setIndex = (index: number) => (this.index = index)

  public getOrders = () => this.orders

  public isBusy = () => this.footman?.currentOrder != 0
}
