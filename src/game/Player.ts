import { Unit } from "w3ts"

import { Config, UNIT } from "util/Config"
import { createUnitAtCenter, withTimedLife } from "util/Util"

export class Player {
  private readonly config: Config
  private readonly startWorker: Unit | undefined

  public readonly playerId: number
  public readonly allyId: number

  private castle: Unit | undefined

  constructor(config: Config, playerId: number, allyId: number) {
    this.config = config
    this.playerId = playerId
    this.allyId = allyId

    this.startWorker = withTimedLife(createUnitAtCenter(this.config.zone[this.playerId], this.playerId, UNIT.START_WORKER), 60)
  }

  public getCastle = () => this.castle

  public setCastle = (castle: Unit | undefined) => (this.castle = castle)
}
