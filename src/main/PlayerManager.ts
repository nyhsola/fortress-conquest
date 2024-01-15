import { Player } from "player/Player"
import { EventSystem } from "system/EventSystem"
import { Config } from "util/Config"
import { forEachPlayer } from "util/Util"

export class PlayerManager {
  private readonly config: Config
  private readonly eventSystem: EventSystem
  private players: Record<number, Player> = {}

  constructor(config: Config, eventSystem: EventSystem) {
    this.config = config
    this.eventSystem = eventSystem

    forEachPlayer((id: number) => (this.players[id] = this.createPlayer(id)))
  }

  private createPlayer(id: number): Player {
    return new Player(this.config, this.eventSystem, id)
  }
}
