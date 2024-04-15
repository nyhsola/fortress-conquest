import { Point } from "w3ts"

import { getPolarPoint } from "util/Util"

export class BaseFormation {
  static ZOMBIE_POINT = (point: Point) => getPolarPoint(point, GetRandomDirectionDeg(), 1800)

  static MINE = (point: Point, direction: number) => getPolarPoint(point, direction + 20, 800)
  static STOCK = (point: Point, direction: number) => getPolarPoint(point, direction + 90, 800)

  static TOWER_1 = (point: Point, direction: number) => getPolarPoint(point, direction + 60, 1200)
  static TOWER_2 = (point: Point, direction: number) => getPolarPoint(point, direction + 120, 1200)
  static TOWER_3 = (point: Point, direction: number) => getPolarPoint(point, direction + 180, 1200)
  static TOWER_4 = (point: Point, direction: number) => getPolarPoint(point, direction + 240, 1200)
  static TOWER_5 = (point: Point, direction: number) => getPolarPoint(point, direction + 300, 1200)
  static TOWER_6 = (point: Point, direction: number) => getPolarPoint(point, direction + 360, 1200)

  static FOOTMAN_DEF: Record<number, (point: Point, direction: number) => Point | undefined> = {
    1: (point: Point, direction: number) => getPolarPoint(point, direction + 30, 1000),
    2: (point: Point, direction: number) => getPolarPoint(point, direction + 90, 1000),
    3: (point: Point, direction: number) => getPolarPoint(point, direction + 150, 1000),
    4: (point: Point, direction: number) => getPolarPoint(point, direction + 210, 1000),
    5: (point: Point, direction: number) => getPolarPoint(point, direction + 270, 1000),
    6: (point: Point, direction: number) => getPolarPoint(point, direction + 330, 1000),
  }
}
