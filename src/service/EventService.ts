import { MapPlayer, Trigger } from "w3ts"
import { Unit } from "w3ts"

import { forEachPlayingPlayer } from "util/CommonUtil"

export const enum EventType {
  PER_SECOND,
  BUILDING_FINISHED,
  CASTING_STARTED,
  CASTING_FINISHED,
  UNIT_DEATH,
  UPGRADING_FINISHED,
}

export class EventService {
  private readonly handlers: Record<EventType, EventHandler<(...e: any) => any>> = {
    [EventType.PER_SECOND]: new EventHandler<() => void>(),
    [EventType.BUILDING_FINISHED]: new EventHandler<(building: Unit | undefined) => void>(),
    [EventType.CASTING_STARTED]: new EventHandler<() => void>(),
    [EventType.CASTING_FINISHED]: new EventHandler<() => void>(),
    [EventType.UNIT_DEATH]: new EventHandler<(deathUnit: Unit | undefined, killingUnit: Unit | undefined) => void>(),
    [EventType.UPGRADING_FINISHED]: new EventHandler<(player: MapPlayer, techId: number) => void>(),
  }

  constructor() {
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

    forEachPlayingPlayer((mapPlayer: MapPlayer) => {
      const upgradeFinished = Trigger.create()
      upgradeFinished.registerPlayerUnitEvent(mapPlayer, EVENT_PLAYER_UNIT_RESEARCH_FINISH, undefined)
      upgradeFinished.addAction(() => this.handlers[EventType.UPGRADING_FINISHED].fire(MapPlayer.fromHandle(GetTriggerPlayer()), GetResearched()))
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
