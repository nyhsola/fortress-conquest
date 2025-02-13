import { sendChatMessageToAllPlayers } from "./CommonUtil"
import { GamePlayer } from "game/GamePlayer"

export class StartUtil {
  private static isGameStarted: boolean = false

  static startWhenAllCastlesAreBuilt(players: Array<GamePlayer>, f: () => void) {
    if (!this.isGameStarted) {
      let isStarted = true
      for (const player of players) {
        isStarted = isStarted && !(player.getCastle() === undefined)
      }
      this.isGameStarted = isStarted

      if (this.isGameStarted) {
        sendChatMessageToAllPlayers("Game started!")
        f()
      }
    }
  }
}
