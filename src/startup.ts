import { GameManager } from "main/GameManager"
import { Config } from "util/Config"

export function initializeGame() {
  const config = new Config()
  new GameManager(config)
}
