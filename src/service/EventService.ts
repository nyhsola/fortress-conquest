import { Trigger } from "w3ts"
import { Unit } from "w3ts"

import { Config, Mode } from "global/Config"

const UNTIL_START_DEBUG = 60
const UNTIL_START = 120
const DIALOG_TITLE = "Game start in..."

export const enum EventType {
  PER_SECOND,
  BUILDING_FINISHED,
  CASTING_STARTED,
  CASTING_FINISHED,
  START_TIMER_EXPIRED,
  UNIT_DEATH,
}

export class EventService {
  private readonly handlers: Record<EventType, EventHandler<(...e: any) => any>> = {
    [EventType.PER_SECOND]: new EventHandler<() => void>(),
    [EventType.BUILDING_FINISHED]: new EventHandler<(building: Unit | undefined) => void>(),
    [EventType.CASTING_STARTED]: new EventHandler<() => void>(),
    [EventType.CASTING_FINISHED]: new EventHandler<() => void>(),
    [EventType.START_TIMER_EXPIRED]: new EventHandler<() => void>(),
    [EventType.UNIT_DEATH]: new EventHandler<(deathUnit: Unit | undefined, killingUnit: Unit | undefined) => void>(),
  }

  constructor(config: Config) {
    const timer = CreateTimer()
    StartTimerBJ(timer, false, config.mode == Mode.DEBUG ? UNTIL_START_DEBUG : UNTIL_START)
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

    const finishedCast = Trigger.create()
    finishedCast.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_ENDCAST)
    finishedCast.addAction(() => this.handlers[EventType.CASTING_FINISHED].fire(Unit.fromHandle(GetSpellAbilityUnit()), GetSpellAbilityId()))

    const unitDeath = Trigger.create()
    unitDeath.registerAnyUnitEvent(EVENT_PLAYER_UNIT_DEATH)
    unitDeath.addAction(() => this.handlers[EventType.UNIT_DEATH].fire(Unit.fromHandle(GetTriggerUnit()), Unit.fromHandle(GetKillingUnit())))

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
