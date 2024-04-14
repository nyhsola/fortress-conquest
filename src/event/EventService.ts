import { Trigger } from "w3ts"
import { Unit } from "w3ts"

const UNTIL_START = 60
const DIALOG_TITLE = "ZOMBIESSS"

export const enum EventType {
  PER_SECOND,
  BUILDING_FINISHED,
  CASTING_STARTED,
  START_TIMER_EXPIRED,
}

export class EventService {
  private readonly handlers: Record<EventType, EventHandler<(e: any) => any>> = {
    [EventType.PER_SECOND]: new EventHandler<() => void>(),
    [EventType.BUILDING_FINISHED]: new EventHandler<(building: Unit | undefined) => void>(),
    [EventType.CASTING_STARTED]: new EventHandler<() => void>(),
    [EventType.START_TIMER_EXPIRED]: new EventHandler<() => void>(),
  }

  constructor() {
    const timer = CreateTimer()
    StartTimerBJ(timer, false, UNTIL_START)
    const timerDialog = CreateTimerDialogBJ(timer, DIALOG_TITLE)

    const buildingFinishedTrigger = Trigger.create()
    buildingFinishedTrigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_CONSTRUCT_FINISH)
    buildingFinishedTrigger.addAction(() => this.handlers[EventType.BUILDING_FINISHED].fire(Unit.fromHandle(GetConstructedStructure())))

    const perSecondTrigger = Trigger.create()
    perSecondTrigger.registerTimerEvent(1.0, true)
    perSecondTrigger.addAction(() => this.handlers[EventType.PER_SECOND].fire({}))

    const beginsCast = Trigger.create()
    beginsCast.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_CAST)
    beginsCast.addAction(() => this.handlers[EventType.CASTING_STARTED].fire(Unit.fromHandle(GetSpellAbilityUnit()), GetSpellAbilityId()))

    const startTimerExpired = Trigger.create()
    startTimerExpired.registerTimerExpireEvent(timer)
    startTimerExpired.addAction(() => {
      this.handlers[EventType.START_TIMER_EXPIRED].fire()
      timer && DestroyTimer(timer)
      timerDialog && DestroyTimerDialogBJ(timerDialog)
    })
  }

  public subscribe(event: EventType, action: (...e: any) => any) {
    this.handlers[event].subscribe(action)
  }
}

class EventHandler<EventCallback extends (...args: any[]) => void> {
  private readonly subscriptions: Array<EventCallback> = []

  public subscribe(action: EventCallback) {
    this.subscriptions.push(action)
  }

  public fire(...args: any) {
    for (const eventCallback of this.subscriptions) {
      eventCallback(...args)
    }
  }
}
