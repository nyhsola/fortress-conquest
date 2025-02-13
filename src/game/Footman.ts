import { Point, Unit } from "w3ts"

import { UNIT } from "global/Config"
import { createUnitAtPoint, issuePointOrder } from "util/CommonUtil"

export enum FOOTMAN_STATE {
  FREE,
  LOCKED,
  ON_DEFEND_POSITION,
  ON_WAR_POSITION,
}

export class Footman {
  private readonly footman: Unit | undefined
  private state: FOOTMAN_STATE = FOOTMAN_STATE.FREE

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
    this.state = FOOTMAN_STATE.ON_DEFEND_POSITION
  }

  public getState = () => this.state

  public isBusy = () => this.footman?.currentOrder != 0

  public lockFootman = () => (this.state = FOOTMAN_STATE.LOCKED)

  public resetState = () => (this.state = FOOTMAN_STATE.FREE)
}
