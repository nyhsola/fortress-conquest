import { MapPlayer, Point, Rectangle, Unit } from "w3ts"
import { Players } from "w3ts/globals"

import { TEXT } from "util/Config"
import { Task } from "util/Task"

export function forEachPlayer(action: (id: number) => void) {
  let players = GetPlayersAll()
  players &&
    ForForce(players, () => {
      let player = MapPlayer.fromEnum()
      let playerId = player?.id
      playerId && action(playerId)
    })
}

export function forEachUnitOfPlayerAndType(playerId: number, unit: number, action: (unit: Unit) => void) {
  let player = Player(playerId)
  let group = player && GetUnitsOfPlayerAndTypeId(player, unit)
  group &&
    ForGroupBJ(group, () => {
      let unitl = Unit.fromHandle(GetEnumUnit())
      unitl && action(unitl)
    })
}

export function createUnitNear(unit: Unit, forPlayer: number, unitType: number): Unit | undefined {
  let point = unit.getPoint()
  return point && Unit.create(Players[forPlayer], unitType, point.x, point.y)
}

export function createUnitAtCenter(zone: rect, forPlayer: number, unit: number): Unit | undefined {
  let area = Rectangle.fromHandle(zone)
  return area && Unit.create(Players[forPlayer], unit, area.centerX, area.centerY)
}

export function createUnitAtPolar(point: Point | undefined, angle: number, distance: number, forPlayer: number, unit: number): Unit | undefined {
  let location = Location(point?.x ?? 0, point?.y ?? 0)
  let locationMine = PolarProjectionBJ(location, distance, angle)
  let pointMine = Point.fromHandle(locationMine)
  return locationMine && Unit.create(Players[forPlayer], unit, pointMine?.x ?? 0, pointMine?.y ?? 0)
}

export function withTimedLife(unit: Unit | undefined, seconds: number): Unit | undefined {
  unit?.applyTimedLife(TEXT.TIMED_LIFE, seconds)
  return unit
}

export function createTask(customAction: () => void, interval: number): Task {
  return new (class extends Task {
    action() {
      customAction()
    }
  })(interval)
}
