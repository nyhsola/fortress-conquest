import { PlayerManager } from "./PlayerManager"
import { BuildingEventSystem } from "system/BuildEventSystem"
import { Config } from "util/Config"

export class GameManager {
  private readonly config: Config

  constructor(config: Config) {
    this.config = config
  }

  public init() {
    let buildEventSystem = new BuildingEventSystem()
    let playerManager = new PlayerManager(this.config, buildEventSystem)
  }
}
