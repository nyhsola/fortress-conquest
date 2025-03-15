import { Point, Unit } from "w3ts"

import { getPolarPoint } from "util/CommonUtil"

const TOWER_DISTANCE = 1100
const FOOTMAN_DISTANCE = 1000

export class Positions {
  static ANIMALS_SPAWN_POINT = (point: Point) => getPolarPoint(point, GetRandomDirectionDeg(), 1800)

  static MINE = (point: Point, direction: number) => getPolarPoint(point, direction + 20, 600)
  static STOCK = (point: Point, direction: number) => getPolarPoint(point, direction + 90, 800)
  static BARRACKS = (point: Point, direction: number) => getPolarPoint(point, direction + 210, 800)

  static CAMPFIRE = (point: Point, direction: number) => getPolarPoint(point, direction + 250, 700)

  static ATTACK_POINT = (playerCastle: Unit, enemyCastle: Unit) => getAttackPoint(playerCastle.getPoint(), enemyCastle.getPoint(), 1600)

  static TOWER_1 = (point: Point, direction: number) => getPolarPoint(point, direction + 60, TOWER_DISTANCE)
  static TOWER_2 = (point: Point, direction: number) => getPolarPoint(point, direction + 120, TOWER_DISTANCE)
  static TOWER_3 = (point: Point, direction: number) => getPolarPoint(point, direction + 180, TOWER_DISTANCE)
  static TOWER_4 = (point: Point, direction: number) => getPolarPoint(point, direction + 240, TOWER_DISTANCE)
  static TOWER_5 = (point: Point, direction: number) => getPolarPoint(point, direction + 300, TOWER_DISTANCE)
  static TOWER_6 = (point: Point, direction: number) => getPolarPoint(point, direction + 360, TOWER_DISTANCE)

  static FOOTMAN_DEF: Record<number, (point: Point, direction: number) => Point | undefined> = {
    1: (point: Point, direction: number) => getPolarPoint(point, direction + 30, FOOTMAN_DISTANCE),
    2: (point: Point, direction: number) => getPolarPoint(point, direction + 90, FOOTMAN_DISTANCE),
    3: (point: Point, direction: number) => getPolarPoint(point, direction + 150, FOOTMAN_DISTANCE),
    4: (point: Point, direction: number) => getPolarPoint(point, direction + 210, FOOTMAN_DISTANCE),
    5: (point: Point, direction: number) => getPolarPoint(point, direction + 270, FOOTMAN_DISTANCE),
    6: (point: Point, direction: number) => getPolarPoint(point, direction + 330, FOOTMAN_DISTANCE),
  }
}

function getAttackPoint(playerCastle: Point | undefined, enemyCastle: Point | undefined, distance: number): Point {
  const enemyX = enemyCastle?.x ?? 0
  const enemyY = enemyCastle?.y ?? 0

  const castleX = playerCastle?.x ?? 0
  const castleY = playerCastle?.y ?? 0

  const vectorX = enemyX - castleX
  const vectorY = enemyY - castleY

  const sqrt = Math.sqrt(vectorX * vectorX + vectorY * vectorY)
  const length = sqrt == 0 ? 1 : sqrt

  const normalizedX = vectorX / length
  const normalizedY = vectorY / length

  const pointX = castleX + normalizedX * distance
  const pointY = castleY + normalizedY * distance

  return Point.create(pointX, pointY)
}
