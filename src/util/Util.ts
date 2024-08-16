import { MapPlayer, Point, Rectangle, Unit } from "w3ts"
import { Players } from "w3ts/globals"

import { TEXT } from "util/Config"
import { Task } from "util/Task"

export function doForLocalPlayer(action: () => void, playerId: number) {
  forEachPlayer((player: MapPlayer) => {
    if (player.id == playerId && GetLocalPlayer() == player.handle) {
      action()
    }
  })
}

export function forEachPlayer(action: (player: MapPlayer) => void) {
  let players = GetPlayersAll()
  players &&
    ForForce(players, () => {
      let player = MapPlayer.fromEnum()
      player && action(player)
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

export function forEachUnitOfType(unit: number, action: (unit: Unit) => void) {
  let group = GetUnitsOfTypeIdAll(unit)
  group &&
    ForGroupBJ(group, () => {
      let unitl = Unit.fromHandle(GetEnumUnit())
      unitl && action(unitl)
    })
}

export function createDestructableAtPoint(point: Point, scale: number, unitType: number): destructable | undefined {
  return CreateDestructable(unitType, point.x, point.y, -90, scale, 0)
}

export function createUnitAtPoint(point: Point, forPlayer: number, unitType: number): Unit | undefined {
  return Unit.create(Players[forPlayer], unitType, point.x, point.y)
}

export function createUnitAtCenter(zone: rect, forPlayer: number, unit: number): Unit | undefined {
  let area = Rectangle.fromHandle(zone)
  return area && Unit.create(Players[forPlayer], unit, area.centerX, area.centerY)
}

export function getPolarPoint(point: Point | undefined, angle: number, distance: number): Point | undefined {
  let location = Location(point?.x ?? 0, point?.y ?? 0)
  let locationMine = PolarProjectionBJ(location, distance, angle)
  let pointMine = Point.fromHandle(locationMine)
  return pointMine
}

export function issueOrder(unit: Unit, order: string, place: Unit) {
  let unitHandle = unit.handle
  let placeHandle = place.handle
  unit && placeHandle && IssueTargetOrderBJ(unitHandle, order, placeHandle)
}

export function issueBuildOrder(unit: Unit, toBuild: number, place: location) {
  const unitHandle = unit.handle
  unitHandle && IssueBuildOrderByIdLocBJ(unitHandle, toBuild, place)
}

export function issuePointOrder(unit: Unit, place: location): boolean {
  const unitHandle = unit.handle
  return unitHandle && IssuePointOrderLocBJ(unitHandle, "move", place)
}

export function withTimedLife(unit: Unit | undefined, seconds: number): Unit | undefined {
  unit?.applyTimedLife(TEXT.TIMED_LIFE, seconds)
  return unit
}

export function removeAbility(unit: Unit | undefined, ability: number) {
  const unitHandle = unit?.handle
  unitHandle && UnitRemoveAbility(unitHandle, ability)
}

export function setAliance(sourcePlayer: player | undefined, otherPlayer: player | undefined) {
  sourcePlayer && otherPlayer && SetPlayerAlliance(sourcePlayer, otherPlayer, ALLIANCE_SHARED_VISION, true)
}

// interval in sec
export function createTask(customAction: () => void, interval: number): Task {
  return new (class extends Task {
    action() {
      customAction()
    }
  })(interval)
}

export function sendChatMessageToAllPlayers(message: string) {
  forEachPlayer((player: MapPlayer) => {
    const playerHandler = player.handle
    DisplayTextToPlayer(playerHandler, 0, 0, message)
  })
}
