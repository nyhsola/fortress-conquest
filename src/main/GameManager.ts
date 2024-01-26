import { Unit } from "w3ts"

import { PlayersManager } from "./PlayersManager"
import { EventQueue } from "event/EventQueue"
import { Signal } from "event/Signal"
import { EventService, EventType } from "event/TriggerSystem"
import { Config } from "util/Config"

export class GameManager {
  private readonly config: Config
  private playersManager: PlayersManager | undefined

  constructor(config: Config) {
    this.config = config
  }

  public init() {
    const eventQueue = new EventQueue()
    const eventService = new EventService()
    const signal = new Signal()

    this.playersManager = new PlayersManager(this.config)

    eventService.subscribe(EventType.PER_SECOND, () => this.update(1))
    eventService.subscribe(EventType.BUILDING_FINISHED, (building: Unit) => this.playersManager?.onBuild(building))
  }

  private update(delta: number) {
    this.playersManager?.update(delta)
  }
}
