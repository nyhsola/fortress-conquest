import { PlayerManager } from "./PlayerManager"
import { EventSystem } from "system/EventSystem"
import { Config } from "util/Config"

export class GameManager {
  private readonly config: Config

  constructor(config: Config) {
    this.config = config
  }

  public init() {
    let eventSystem = new EventSystem()
    let playerManager = new PlayerManager(this.config, eventSystem)
  }
}
