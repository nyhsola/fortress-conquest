import { PlayerManager } from "./PlayerManager"
import { TriggerSystem } from "system/TriggerSystem"
import { Config } from "util/Config"

export class GameManager {
  private readonly config: Config

  constructor(config: Config) {
    this.config = config
  }

  public init() {
    const eventSystem = new TriggerSystem()

    const playerManager = new PlayerManager(this.config, eventSystem)
  }
}
