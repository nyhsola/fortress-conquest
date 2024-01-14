import { Rectangle, Region, Unit } from "w3ts"
import { Players } from "w3ts/globals"

import { Config, UNIT } from "main/Config.js"

export function initializeGame() {
  print("initializing...")

  let config = new Config()
  let area = Rectangle.fromHandle(config.zone[0])

  Unit.create(Players[0], UNIT.WORKER, area.centerX, area.centerY)
}
