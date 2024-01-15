import { Point, Rectangle, Unit } from "w3ts"
import { Players } from "w3ts/globals"

import { EventSystem, EventType } from "system/EventSystem"
import { Config, TEXT, UNIT } from "util/Config"

export class Player {
  private playerNumber: number
  private config: Config
  private unit: Unit | undefined
  private mine: Unit | undefined

  constructor(config: Config, eventSystem: EventSystem, playerNumber: number) {
    this.config = config
    this.playerNumber = playerNumber
    this.unit = this.spawnStart()

    eventSystem.subscribe(EventType.BUILDING_FINISHED, (building: unit) => this.onCastlePlaced(building))
  }

  private spawnStart(): Unit | undefined {
    let zone = this.config.zone[this.playerNumber]
    let area = Rectangle.fromHandle(zone)
    let unit = area && Unit.create(Players[this.playerNumber], UNIT.WORKER, area.centerX, area.centerY)
    unit?.applyTimedLife(TEXT.TIMED_LIFE, 60)
    return unit
  }

  private spawnMine(unit: Unit | undefined): Unit | undefined {
    let point = unit?.getPoint()
    let location = Location(point?.x ?? 0, point?.y ?? 0)
    let angle = GetRandomDirectionDeg()
    let locationMine = PolarProjectionBJ(location, 1400, angle)
    let pointMine = Point.fromHandle(locationMine)
    return locationMine && Unit.create(Players[PLAYER_NEUTRAL_PASSIVE], UNIT.MINE, pointMine?.x ?? 0, pointMine?.y ?? 0)
  }

  private onCastlePlaced(unit: unit) {
    let castle = Unit.fromHandle(unit)
    let owner = castle?.getOwner()
    if (owner?.id == this.playerNumber) {
      this.mine = this.spawnMine(castle)
    }
  }
}
