import { Trigger } from "w3ts"

export const enum EventType {
  BUILDING_FINISHED,
}

export class EventSystem {
  private buildingFinishedTrigger: Trigger
  private handlers: Record<EventType, EventHandler<(e: any) => any>> = {
    [EventType.BUILDING_FINISHED]: new EventHandler<(building: unit) => void>(),
  }

  constructor() {
    this.buildingFinishedTrigger = Trigger.create()
    this.buildingFinishedTrigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_CONSTRUCT_FINISH)
    this.buildingFinishedTrigger.addAction(() => this.onBuildingFinished(GetConstructedStructure()))
  }

  public subscribe(event: EventType, action: (e: any) => any) {
    this.handlers[event].subscribe(action)
  }

  private onBuildingFinished(building: unit | undefined) {
    this.handlers[EventType.BUILDING_FINISHED].fire(building)
  }
}

class EventHandler<EventCallback extends (...args: any[]) => void> {
  public readonly subscriptions: Array<EventCallback> = []

  public subscribe(action: EventCallback) {
    this.subscriptions.push(action)
  }

  public fire(...args: Parameters<EventCallback>) {
    for (const eventCallback of this.subscriptions) {
      eventCallback(...args)
    }
  }
}
