import { Trigger } from "w3ts"
import { Unit } from "w3ts"

export const enum TriggerType {
  PER_SECOND,
  BUILDING_FINISHED,
  CASTING_STARTED,
}

export class TriggerSystem {
  private handlers: Record<TriggerType, EventHandler<(e: any) => any>> = {
    [TriggerType.PER_SECOND]: new EventHandler<() => void>(),
    [TriggerType.BUILDING_FINISHED]: new EventHandler<(building: Unit | undefined) => void>(),
    [TriggerType.CASTING_STARTED]: new EventHandler<() => void>(),
  }

  constructor() {
    const buildingFinishedTrigger = Trigger.create()
    buildingFinishedTrigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_CONSTRUCT_FINISH)
    buildingFinishedTrigger.addAction(() => this.handlers[TriggerType.BUILDING_FINISHED].fire(Unit.fromHandle(GetConstructedStructure())))

    const perSecondTrigger = Trigger.create()
    perSecondTrigger.registerTimerEvent(1.0, true)
    perSecondTrigger.addAction(() => this.handlers[TriggerType.PER_SECOND].fire({}))

    const beginsCast = Trigger.create()
    beginsCast.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_CAST)
    beginsCast.addAction(() => this.handlers[TriggerType.CASTING_STARTED].fire(Unit.fromHandle(GetSpellAbilityUnit()), GetSpellAbilityId()))
  }

  public subscribe(event: TriggerType, action: (...e: any) => any) {
    this.handlers[event].subscribe(action)
  }
}

class EventHandler<EventCallback extends (...args: any[]) => void> {
  private subscriptions: Array<EventCallback> = []

  public subscribe(action: EventCallback) {
    this.subscriptions.push(action)
  }

  public fire(...args: any) {
    for (const eventCallback of this.subscriptions) {
      eventCallback(...args)
    }
  }
}
