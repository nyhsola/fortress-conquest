import { GamePlayer } from "game/GamePlayer"

export class UIManager {
  private readonly player: GamePlayer

  constructor(player: GamePlayer) {
    this.player = player
  }
}
