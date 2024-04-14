import { FogModifier, Point, Rectangle } from "w3ts"

import { Player } from "game/Player"
import { UNIT } from "util/Config"
import { createDestructableAtPoint, forEachPlayer } from "util/Util"

const STEP_X = 100
const STEP_Y = 100

const FOG_WIDTH = 600
const FOG_HEIGHT = 600

export class WarService {
  static initializeWarPlace(players: Array<Player>) {
    print("initializeWarPlace")

    // const map = GetPlayableMapRect()
    // const points = new Array<Point>()
    // players.forEach((it) => {
    //   const point = it.getPoint()
    //   point && points.push(point)
    // })
    // print("count player ", players.length)
    // print("count points ", points.length)
    // const freeRect = map && this.findFreeRect(map, 2, points)
    // print(freeRect?.minX, freeRect?.maxX, freeRect?.minY, freeRect?.maxY)
    // print(points[0]?.x, points[0]?.y)
    // const centerX = freeRect?.centerX
    // const centerY = freeRect?.centerY
    // const center = centerX && centerY && Point.create(centerX, centerY)
    // center && createDestructableAtPoint(center, 2, UNIT.BANNER)
    // const rect = centerX && centerY && Rectangle.create(centerX - FOG_WIDTH, centerY - FOG_HEIGHT, centerX + FOG_WIDTH, centerY + FOG_HEIGHT)
    // forEachPlayer((mapPlayer) => rect && CreateFogModifierRectBJ(true, mapPlayer.handle, FOG_OF_WAR_VISIBLE, rect.handle))
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
