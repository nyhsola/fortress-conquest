import { PlayerManager } from "./PlayerManager"
import { AbilitySystem } from "system/AbilitySystem"
import { EventSystem } from "system/EventSystem"
import { Config } from "util/Config"

export class GameManager {
  private readonly config: Config

  constructor(config: Config) {
    this.config = config
  }

  public init() {
    const eventSystem = new EventSystem()
    const abilitySystem = new AbilitySystem(eventSystem)

    const playerManager = new PlayerManager(this.config, eventSystem, abilitySystem)
  }
}
