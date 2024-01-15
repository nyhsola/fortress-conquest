import { Player } from "player/Player"
import { BuildingEventSystem } from "system/BuildEventSystem"
import { Config } from "util/Config"

const PLAYER_NUMBER = 6

export class PlayerManager {
  private players: Record<number, Player> = {}

  constructor(config: Config, buildEventSystem: BuildingEventSystem) {
    for (let i = 0; i < PLAYER_NUMBER; i++) {
      this.players[i] = new Player(config, buildEventSystem, i)
    }
  }
}
