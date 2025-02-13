import { MapPlayer, TextTag, Unit } from "w3ts"

export class F_COLOR {
  static readonly GOLD = new F_COLOR(225, 204, 0)
  static readonly RED = new F_COLOR(255, 0, 0)

  private constructor(
    public readonly red: number,
    public readonly green: number,
    public readonly blue: number
  ) {}
}

export function createFloatingTextOnUnitRandom(text: string, unit: Unit, player: MapPlayer, size: number, fcolor: F_COLOR) {
  const x = unit.point.x + GetRandomInt(-50, 50)
  const y = unit.point.y + GetRandomInt(-50, 50)
  createFloatingText(text, x, y, player, size, fcolor)
}

export function createFloatingTextOnUnit(text: string, unit: Unit, player: MapPlayer, size: number, fcolor: F_COLOR) {
  const x = unit.point.x
  const y = unit.point.y
  createFloatingText(text, x, y, player, size, fcolor)
}

export function createFloatingText(text: string, posX: number, posY: number, player: MapPlayer, size: number, fcolor: F_COLOR) {
  const textTag = TextTag.create()
  textTag?.setVisible(true)
  textTag?.setText(text, size, true)
  textTag?.setPos(posX, posY, 10)
  textTag?.setColor(fcolor.red, fcolor.green, fcolor.blue, 0)
  textTag?.setPermanent(false)
  textTag?.setLifespan(3)
  textTag?.setFadepoint(1.0)
  textTag?.setVelocityAngle(64, 90)

  const textTagHandle = textTag?.handle
  const allPlayers = GetPlayersAll()
  const playerToShow = GetForceOfPlayer(player.handle)
  textTagHandle && allPlayers && ShowTextTagForceBJ(false, textTagHandle, allPlayers)
  textTagHandle && playerToShow && ShowTextTagForceBJ(true, textTagHandle, playerToShow)
}
