import { Point, Unit } from "w3ts"

import { UNIT } from "util/Config"
import { createUnitAtPoint, issueBuildOrder, issueOrder, issuePointOrder } from "util/Util"

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

  public orderDefPoint(location: location) {
    this.footman && issuePointOrder(this.footman, location)
    this.state = FOOTMAN_STATE.ON_DEFEND_POSITION
  }

  public orderWarPoint(location: location) {
    this.footman && issuePointOrder(this.footman, location)
    this.state = FOOTMAN_STATE.ON_WAR_POSITION
  }

  public lockFootman() {
    this.state = FOOTMAN_STATE.LOCKED
  }

  public getState = () => this.state

  public isBusy = () => this.footman?.currentOrder != 0

  public resetState = () => (this.state = FOOTMAN_STATE.FREE)
}
