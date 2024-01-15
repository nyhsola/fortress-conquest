import { Rectangle, Unit } from "w3ts"
import { Players } from "w3ts/globals"

import { BuildEventType } from "build/Build"
import { BuildingEventSystem } from "system/BuildEventSystem"
import { Config, TEXT, UNIT } from "util/Config"

export class Player {
  private playerNumber: number

  constructor(config: Config, buildEventSystem: BuildingEventSystem, playerNumber: number) {
    this.playerNumber = playerNumber

    let zone = config.zone[playerNumber]
    let area = Rectangle.fromHandle(zone)
    let unit = area && Unit.create(Players[playerNumber], UNIT.WORKER, area.centerX, area.centerY)
    unit?.applyTimedLife(TEXT.TIMED_LIFE, 60)

    buildEventSystem.subscribe(BuildEventType.FINISHED, playerNumber, (building: unit | undefined) => this.onCastlePlaced(building))
  }

  private onCastlePlaced(unit: unit | undefined) {
    let castle = Unit.fromHandle(unit)
    let owner = castle?.getOwner()
    if (owner?.id == this.playerNumber) {
      print("onCastlePlaced")
    }
  }
}
