import { Trigger } from "w3ts"
import { Unit } from "w3ts"

export const enum EventType {
  PER_SECOND,
  BUILDING_FINISHED,
}

export class EventSystem {
  private handlers: Record<EventType, EventHandler<(e: any) => any>> = {
    [EventType.BUILDING_FINISHED]: new EventHandler<(building: Unit | undefined) => void>(),
    [EventType.PER_SECOND]: new EventHandler<() => void>(),
  }

  constructor() {
    const buildingFinishedTrigger = Trigger.create()
    buildingFinishedTrigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_CONSTRUCT_FINISH)
    buildingFinishedTrigger.addAction(() => this.handlers[EventType.BUILDING_FINISHED].fire(Unit.fromHandle(GetConstructedStructure())))

    const perSecondTrigger = Trigger.create()
    perSecondTrigger.registerTimerEvent(1.0, true)
    perSecondTrigger.addAction(() => this.handlers[EventType.PER_SECOND].fire({}))
  }

  public subscribe(event: EventType, action: (e: any) => any) {
    this.handlers[event].subscribe(action)
  }
}

class EventHandler<EventCallback extends (...args: any[]) => void> {
  private subscriptions: Array<EventCallback> = []

  public subscribe(action: EventCallback) {
    this.subscriptions.push(action)
  }

  public fire(...args: Parameters<EventCallback>) {
    for (const eventCallback of this.subscriptions) {
      eventCallback(...args)
    }
  }
}
