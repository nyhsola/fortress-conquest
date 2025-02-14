import { Point } from "w3ts"

import { getPolarPoint } from "util/CommonUtil"

const TOWER_DISTANCE = 1100
const FOOTMAN_DISTANCE = 950

export class Positions {
  static ANIMALS_SPAWN_POINT = (point: Point) => getPolarPoint(point, GetRandomDirectionDeg(), 1800)

  static MINE = (point: Point, direction: number) => getPolarPoint(point, direction + 20, 600)
  static STOCK = (point: Point, direction: number) => getPolarPoint(point, direction + 90, 800)
  static BARRACKS = (point: Point, direction: number) => getPolarPoint(point, direction + 210, 800)

  static BANNER = (point: Point, direction: number) => getPolarPoint(point, direction + 250, 700)

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
