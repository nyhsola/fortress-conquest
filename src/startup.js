import { Rectangle, Unit } from "w3ts"
import { Players } from "w3ts/globals"

import { Config, UNIT } from "main/Config.js"

const PLAYER_NUMBER = 6

export function initializeGame() {
  print("initializing...")

  let config = new Config()

  for (let i = 0; i < PLAYER_NUMBER; i++) {
    let area = Rectangle.fromHandle(config.zone[i])
    let unit = Unit.create(Players[i], UNIT.WORKER, area.centerX, area.centerY)
  }
}
