import { Unit } from "w3ts"

import { EventSystem, EventType } from "system/EventSystem"
import { Config, UNIT } from "util/Config"
import { Task } from "util/Task"
import { createTask, createUnitAtCenter, createUnitAtPolar, withTimedLife } from "util/Util"

export class Player {
  private playerNumber: number
  private config: Config
  private unit: Unit | undefined
  private mine: Unit | undefined
  private task: Task

  constructor(config: Config, eventSystem: EventSystem, playerNumber: number) {
    this.config = config
    this.playerNumber = playerNumber
    this.unit = this.spawnStart()
    this.task = createTask(() => print("every 10"), 10)

    eventSystem.subscribe(EventType.BUILDING_FINISHED, (building: Unit) => this.onCastlePlaced(building))
    eventSystem.subscribe(EventType.PER_SECOND, () => this.task.update(1))
  }

  private spawnStart(): Unit | undefined {
    return withTimedLife(createUnitAtCenter(this.config.zone[this.playerNumber], this.playerNumber, UNIT.WORKER), 60)
  }

  private spawnMine(unit: Unit | undefined): Unit | undefined {
    return createUnitAtPolar(unit?.getPoint(), GetRandomDirectionDeg(), 1400, PLAYER_NEUTRAL_PASSIVE, UNIT.MINE)
  }

  private onCastlePlaced(unit: Unit) {
    let owner = unit?.getOwner()
    if (owner?.id == this.playerNumber) {
      this.mine = this.spawnMine(unit)
    }
  }
}
