import { Unit } from "w3ts"

import { PlayerManager } from "./PlayerManager"
import { EventQueue } from "event/EventQueue"
import { Signal } from "event/Signal"
import { EventService, EventType } from "event/TriggerSystem"
import { Config } from "util/Config"

export class GameManager {
  private readonly config: Config
  private playerManager: PlayerManager | undefined

  constructor(config: Config) {
    this.config = config
  }

  public init() {
    const eventQueue = new EventQueue()
    const eventService = new EventService()
    const signal = new Signal()

    this.playerManager = new PlayerManager(this.config)

    eventService.subscribe(EventType.PER_SECOND, () => this.tick(1))
    eventService.subscribe(EventType.BUILDING_FINISHED, (building: Unit) => this.playerManager?.onBuild(building))
  }

  private tick(delta: number) {
    this.playerManager?.tick(delta)
  }
}
