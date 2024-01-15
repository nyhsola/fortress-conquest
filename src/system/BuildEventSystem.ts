import { Trigger } from "w3ts"

export const enum BuildEventType {
  FINISHED,
}

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

export class BuildEventHandler {
  private subscriptions: Record<number, (building: unit | undefined) => void> = {}

  public subscribe(id: number, action: (building: unit | undefined) => void) {
    this.subscriptions[id] = action
  }

  public fire(building: unit | undefined) {
    for (let key of Object.keys(this.subscriptions)) {
      this.subscriptions[Number(key)](building)
    }
  }
}
