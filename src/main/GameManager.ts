import { Rectangle, Unit } from "w3ts"
import { Players } from "w3ts/globals"

import { Config, UNIT } from "main/Config"

const PLAYER_NUMBER = 6

export class GameManager {
  constructor(config: Config) {
    for (let i = 0; i < PLAYER_NUMBER; i++) {
      let zone = config.zone[i]
      let area = Rectangle.fromHandle(zone)
      let unit = area && Unit.create(Players[i], UNIT.WORKER, area.centerX, area.centerY)
    }
  }
}
