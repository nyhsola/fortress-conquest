import { Point, Unit } from "w3ts"

import { EventSystem, EventType } from "system/EventSystem"
import { ABILITY, Config, UNIT } from "util/Config"
import { Task } from "util/Task"
import { createTask, createUnitAtCenter, createUnitAtPolar, createUnitNear, forEachUnitOfPlayerAndType, withTimedLife } from "util/Util"

export class Player {
  private playerId: number
  private allyId: number
  private config: Config
  private startWorker: Unit | undefined
  private castle: Unit | undefined
  private mine: Unit | undefined
  private task: Task

  constructor(config: Config, eventSystem: EventSystem, playerId: number, allyId: number) {
    this.config = config
    this.playerId = playerId
    this.allyId = allyId
    this.startWorker = this.spawnStartWorker()
    this.task = createTask(() => this.each10Seconds(), 10)

    eventSystem.subscribe(EventType.BUILDING_FINISHED, (building: Unit) => this.onCastlePlaced(building))
    eventSystem.subscribe(EventType.PER_SECOND, () => this.task.update(1))
  }

  private spawnStartWorker(): Unit | undefined {
    return withTimedLife(createUnitAtCenter(this.config.zone[this.playerId], this.playerId, UNIT.START_WORKER), 60)
  }

  private spawnMineNear(point: Point | undefined): Unit | undefined {
    return createUnitAtPolar(point, GetRandomDirectionDeg(), 1400, PLAYER_NEUTRAL_PASSIVE, UNIT.MINE)
  }

  private each10Seconds() {
    forEachUnitOfPlayerAndType(this.playerId, UNIT.CASTLE, (unit: Unit) => {
      if (this.castle != undefined && unit.getAbilityLevel(ABILITY.WORKERS) == 1) {
        createUnitNear(unit, this.playerId, UNIT.WORKER)
      }
    })
  }

  private onCastlePlaced(unit: Unit) {
    let owner = unit?.getOwner()
    if (owner?.id == this.playerId) {
      this.task.reset()
      this.castle = unit
      this.mine = this.spawnMineNear(unit?.getPoint())
    }
  }
}
