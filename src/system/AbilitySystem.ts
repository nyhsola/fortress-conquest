import { Unit } from "w3ts"

import { EventSystem, EventType } from "./EventSystem"
import { ABILITY, UNIT } from "util/Config"
import { forEachUnitOfType } from "util/Util"

export const enum AbilityType {
  WORKER,
}

export class AbilitySystem {
  private handlers: Record<AbilityType, EventHandler<(...args: any[]) => any>> = {
    [AbilityType.WORKER]: new EventHandler<(unit: Unit, abilityId: number) => void>(),
  }

  constructor(eventSystem: EventSystem) {
    eventSystem.subscribe(EventType.PER_SECOND, () => forEachUnitOfType(UNIT.CASTLE, (unit: Unit) => unit.issueImmediateOrder("roar")))
    eventSystem.subscribe(EventType.CASTING_STARTED, (unit: Unit, abilityId: number) => this.fireWorkerAbility(unit, abilityId))
  }

  public subscribe(event: AbilityType, action: (...args: any[]) => any) {
    this.handlers[event].subscribe(action)
  }

  private fireWorkerAbility(unit: Unit, abilityId: number) {
    if (unit.typeId == UNIT.CASTLE && abilityId == ABILITY.WORKERS_NEW) {
      this.handlers[AbilityType.WORKER].fire(unit)
    }
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
