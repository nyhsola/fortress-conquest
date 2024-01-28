import { Point } from "w3ts"

import { getPolarPoint } from "util/Util"

export class BaseFormation {
  static MINE = (point: Point, direction: number) => getPolarPoint(point, direction + 0, 1500)
  static STOCK = (point: Point, direction: number) => getPolarPoint(point, direction + 40, 800)
  static TOWER = (point: Point, direction: number) => getPolarPoint(point, direction + 90, 1600)
}
