import { FogModifier, Point, Rectangle } from "w3ts"

import { GamePlayer } from "game/Player"
import { UNIT } from "util/Config"
import { createDestructableAtPoint, forEachPlayer } from "util/Util"

const STEP_X = 300
const STEP_Y = 300
const FOG_RADIUS = 1200

export class WarService {
  static initializeWarPlace(players: Array<GamePlayer>): Point | undefined | 0 {
    const map = GetPlayableMapRect()
    const points: Array<Point> = []
    players.forEach((it) => {
      const point = it.getPoint()
      point && points.push(point)
    })
    const freeRect = map && this.findFreeRect(map, 2, points)
    const centerX = freeRect?.centerX
    const centerY = freeRect?.centerY
    const center = centerX && centerY && Point.create(centerX, centerY)
    center && createDestructableAtPoint(center, 2, UNIT.BANNER)
    const location = centerX && centerY && Location(centerX, centerY)
    forEachPlayer((mapPlayer) => location && CreateFogModifierRadiusLocBJ(true, mapPlayer.handle, FOG_OF_WAR_VISIBLE, location, FOG_RADIUS))
    return center
  }

  private static findFreeRect(mainRectHandle: rect, times: number, points: Array<Point | undefined>): Rectangle | undefined {
    const mainRect = Rectangle.fromHandle(mainRectHandle)
    const width = (mainRect?.maxX ?? 0) - (mainRect?.minX ?? 0)
    const height = (mainRect?.maxY ?? 0) - (mainRect?.minY ?? 0)
    const startX = mainRect?.minX ?? 0
    const startY = mainRect?.minY ?? 0

    const minX = startX
    const maxX = startX + width / times
    const minY = startY
    const maxY = startY + height / times

    const timesX = (width - (maxX - minX)) / STEP_X
    const timesY = (height - (maxY - minY)) / STEP_Y

    for (let i = 0; i < timesX; i++) {
      for (let j = 0; j < timesY; j++) {
        const minXt = minX + STEP_X * i
        const maxXt = maxX + STEP_X * (i + 1)
        const minYt = minY + STEP_Y * j
        const maxYt = maxY + STEP_Y * (j + 1)

        if (!this.isIn(minXt, maxXt, minYt, maxYt, points)) {
          return Rectangle.create(minXt, minYt, maxXt, maxYt)
        }
      }
    }

    return undefined
  }

  private static isIn(minX: number, maxX: number, minY: number, maxY: number, points: Array<Point | undefined>): boolean {
    for (const point of points) {
      const x = point?.x
      const y = point?.y
      if (x && y && x >= minX && x <= maxX && y >= minY && y <= maxY) {
        return true
      }
    }
    return false
  }
}
