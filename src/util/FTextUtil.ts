import { MapPlayer, TextTag, Unit } from "w3ts"

export function createFloatingText(text: string, unit: Unit, player: MapPlayer) {
  let textTag = TextTag.create()
  textTag?.setVisible(true)
  textTag?.setText(text, 10, true)
  textTag?.setPosUnit(unit, 10)
  textTag?.setColor(225, 204, 0, 0)
  textTag?.setPermanent(false)
  textTag?.setLifespan(3)
  textTag?.setFadepoint(1.0)
  textTag?.setVelocityAngle(64, 90)

  // let textTagHandle = textTag?.handle
  // let allPlayers = GetPlayersAll()
  // let playerToShow = GetForceOfPlayer(player.handle)
  // textTagHandle && allPlayers && ShowTextTagForceBJ(false, textTagHandle, allPlayers)
  // textTagHandle && playerToShow && ShowTextTagForceBJ(true, textTagHandle, playerToShow)
}
