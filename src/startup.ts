import { Rectangle, Unit } from "w3ts"
import { Players } from "w3ts/globals"

import { Config, UNIT } from "main/Config"
import { GameManager } from "main/GameManager"

export function initializeGame() {
  print("initializing...")
  let config = new Config()

  new GameManager(config)
}
