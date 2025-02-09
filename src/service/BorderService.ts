import { Point, Rectangle } from "w3ts"

import { GamePlayer } from "game/GamePlayer"

const STEP_X = 200
const STEP_Y = 200

export class BorderService {
  constructor(players: Array<GamePlayer>) {
    const map = GetPlayableMapRect()

    const rectangle = Rectangle.fromHandle(map)

    const width = (rectangle?.maxX ?? 0) - (rectangle?.minX ?? 0)
    const height = (rectangle?.maxY ?? 0) - (rectangle?.minY ?? 0)

    const startX = rectangle?.minX ?? 0
    const startY = rectangle?.minY ?? 0

    const voronoi: number[][] = []
    const neighborMap = new Map()

    for (const player of players) {
      neighborMap.set(player.playerId, new Set())
    }

    for (let totalWidth = startX; totalWidth < width; totalWidth += STEP_X) {
      voronoi.push([])
      for (let totalHeight = startY; totalHeight < height; totalHeight += STEP_Y) {
        let minDistance = Infinity
        let closest = -1

        const centerX = totalWidth + STEP_X / 2
        const centerY = totalHeight + STEP_Y / 2

        for (const player of players) {
          const point = player.getPoint()
          const distance = this.distanceTo(centerX, centerY, point?.x ?? Infinity, point?.y ?? Infinity)

          if (distance < minDistance) {
            minDistance = distance
            closest = player.playerId
          }
        }

        voronoi[voronoi.length - 1].push(closest)
      }
    }

    for (let x = 0; x < voronoi.length; x++) {
      for (let y = 0; y < voronoi[x].length; y++) {
        const currentCastle = voronoi[x][y]
        const neighborsArray = [voronoi[x - 1]?.[y], voronoi[x + 1]?.[y], voronoi[x]?.[y - 1], voronoi[x]?.[y + 1]]
        const neighbors = neighborsArray.filter((n) => n !== undefined && n !== currentCastle)

        for (const neighbor of neighbors) {
          neighborMap.get(currentCastle).add(neighbor)
          neighborMap.get(neighbor).add(currentCastle)
        }
      }
    }
  }

  private distanceTo(oneX: number, oneY: number, twoX: number, twoY: number) {
    return Math.sqrt((oneX - twoX) ** 2 + (oneY - twoY) ** 2)
  }
}
