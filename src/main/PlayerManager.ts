import { Player } from "player/Player"
import { EventSystem } from "system/EventSystem"
import { Config } from "util/Config"

const PLAYER_NUMBER = 6

export class PlayerManager {
  private players: Record<number, Player> = {}

  constructor(config: Config, eventSystem: EventSystem) {
    for (let i = 0; i < PLAYER_NUMBER; i++) {
      this.players[i] = new Player(config, eventSystem, i)
    }
  }
}
