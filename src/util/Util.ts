import { MapPlayer } from "w3ts"

export function forEachPlayer(action: (id: number) => void) {
  let players = GetPlayersAll()
  players &&
    ForForce(players, () => {
      let player = MapPlayer.fromEnum()
      let playerId = player?.id
      playerId && action(playerId)
    })
}
