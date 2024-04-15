import { Point, Unit } from "w3ts"

import { UNIT } from "util/Config"
import { createUnitAtPoint, issueBuildOrder, issueOrder, issuePointOrder } from "util/Util"

export enum FOOTMAN_STATE {
  FREE,
  ON_POSITION,
}

export class Footman {
  private readonly footman: Unit | undefined
  private state: FOOTMAN_STATE

  constructor(point: Point, allyId: number) {
    this.footman = createUnitAtPoint(point, allyId, UNIT.FOOTMAN)
    this.state = FOOTMAN_STATE.FREE
  }

  public orderPoint(location: location) {
    this.footman && issuePointOrder(this.footman, location)
    this.state = FOOTMAN_STATE.ON_POSITION
  }

  public getState = () => this.state

  public isBusy = () => this.footman?.currentOrder != 0
}
