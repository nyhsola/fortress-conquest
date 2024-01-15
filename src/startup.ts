import { GameManager } from "main/GameManager"
import { Config } from "util/Config"

export function initializeGame() {
  let config = new Config()

  let gameManager = new GameManager(config)

  gameManager.init()
}
