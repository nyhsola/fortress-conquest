import { Trigger } from "w3ts"
import { Unit } from "w3ts"

import { BuildEventHandler } from "../build/BuildEventHandler"
import { BuildEventType } from "build/Build"

export class BuildingEventSystem {
  private buildingFinishedTrigger: Trigger
  private handlers: Record<BuildEventType, BuildEventHandler> = {
    [BuildEventType.FINISHED]: new BuildEventHandler(),
  }

  constructor() {
    this.buildingFinishedTrigger = Trigger.create()
    this.buildingFinishedTrigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_CONSTRUCT_FINISH)
    this.buildingFinishedTrigger.addAction(() => this.onBuildingFinished(GetConstructedStructure()))
  }

  public subscribe(event: BuildEventType, id: number, action: (building: unit | undefined) => void) {
    this.handlers[event].subscribe(id, action)
  }

  private onBuildingFinished(building: unit | undefined) {
    this.handlers[BuildEventType.FINISHED].fire(building)
  }
}
